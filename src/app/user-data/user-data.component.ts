import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpAPIRequestService } from './HttpAPIRequest.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit,OnChanges{
	@ViewChild('scrollContent') scrollContent: any;
	scrollPosition = 0;
	modalReference : any;
	searchText = '';
	Users = [];
	UpdateForm: FormGroup;
	totalAmount=0;
	editName = ''; 	editAmount : number;  editAddress = ''; editMobile : number; editGift = '';
	editId = '';

	datatoUpdate = {
		name: '',
		amount: 0,
		address: '',
		mobile: 9999999999,
		gift: ''
	};
	constructor(private request: HttpAPIRequestService, private http: HttpClient, private modalService: NgbModal) { }

	resultHandler(resultData : any){
		console.log("result")
		let n = Object.keys(resultData).length;
		this.Users = [];
		for(let i=0; i<n; i++)
		{
			if(resultData[i].amount!=0)
			{
				this.Users.push(resultData[i]);
				this.totalAmount = this.totalAmount + resultData[i].amount;
			}
		}
		setInterval(()=>{
			// console.log("starts scrolling")
			this.scrollContent.nativeElement.scrollTop += this.scrollContent.nativeElement.scrollHeight/this.Users.length;
			if(this.scrollContent.nativeElement.scrollTop == this.scrollPosition){
				// console.log("scroll at end")
				this.scrollContent.nativeElement.scrollTop = 0;
			}
			else{
				this.scrollPosition = this.scrollContent.nativeElement.scrollTop;
			}
		}, 2000)
	}

	ngOnInit(): void {
		console.log("ngoninit")
		this.request.datatoGet().subscribe(resultData => {
			this.resultHandler(resultData);
		})
		this.UpdateForm = new FormGroup({
			'userUpdateData': new FormGroup({
			'updatedName': new FormControl(null, [Validators.required]),
			'updatedAmount': new FormControl(null, [Validators.required]),
			'updatedAddress': new FormControl(null, [Validators.required, ]),
			'updatedMobile': new FormControl(null, [Validators.required]),
			'updatedGift': new FormControl(null, []),
			}),
		});

	}

	ngOnChanges(){
		this.request.datatoGet().subscribe(resultData => {
			this.resultHandler(resultData);
		})
		console.log("change")
	}

	onDelete(id: string, name:string){
		this.request.datatoDelete(id).subscribe(resultData => {
			this.resultHandler(resultData)
		})
		const user =  this.Users.find(x => x.name == name);
		this.totalAmount = this.totalAmount - user.amount;
		
	}

	onEdit(id:string, name:string, amount:number, address:string, mobile:number, gift:string, content:any){
		this.editName = name;
		this.editAmount = amount;
		this.editAddress = address;
		this.editMobile = mobile;
		this.editGift = gift;
		this.editId = id;
		this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
		}

    onUpdate(){
		this.datatoUpdate.name = this.UpdateForm.value.userUpdateData.updatedName;
		this.datatoUpdate.amount = this.UpdateForm.value.userUpdateData.updatedAmount,
		this.datatoUpdate.address = this.UpdateForm.value.userUpdateData.updatedAddress,
		this.datatoUpdate.mobile = this.UpdateForm.value.userUpdateData.updatedMobile,
		this.datatoUpdate.gift = this.UpdateForm.value.userUpdateData.updatedGift;
		this.request.datatoUpdate(this.editId, this.datatoUpdate).subscribe(resultData =>{
			this.resultHandler(resultData);
		})
		this.modalReference.close();
	}

}
