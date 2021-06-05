import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpAPIRequestService } from './HttpAPIRequest.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  modalReference : any;
  searchText = '';
  Users = [];
	UpdateForm: FormGroup;

	editName = ''; 	editAmount : number;  editAddress = ''; editMobile : number;
  editGift = '';
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
		let n = Object.keys(resultData).length;
		this.Users = [];
		for(let i=0; i<n; i++){
      if(resultData[i].amount!=0){
        this.Users.push(resultData[i]);
      }
		}
	}

  ngOnInit(): void {
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

	onDelete(id: string){
		console.log(id);
		this.request.datatoDelete(id).subscribe(resultData => {
		this.resultHandler(resultData)
		})
	}

	onEdit(id:string, name:string, amount:number, address:string, mobile:number, gift:string, content:any){
    console.log("entered id"+ id);
		this.editName = name;
    this.editAmount = amount;
    this.editAddress = address;
    this.editMobile = mobile;
    this.editGift = gift;
    this.editId = id;
		this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
		}

    onUpdate(){
		console.log("data updating")
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
