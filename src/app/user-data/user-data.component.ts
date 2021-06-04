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
  Users = [
    {
      _id: '06dff32h34kv9711',
      FirstName: 'Aditya',
      LastName : 'Surana',
      amount: 0,
      address: '',
      MobileNumber: 9999999999,
      gift: ''
    }];
	UpdateForm: FormGroup;

	editFirstName = ''; editLastName = ''; 	editAmount : number;  editAddress = ''; editMobileNumber : number;
  editGift = '';
  editId = '';

  datatoUpdate = {
		FirstName: '',
		LastName : '',
    amount: 0,
    address: '',
    MobileNumber: 9999999999,
    gift: ''
	};
  constructor(private request: HttpAPIRequestService, private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
			'userUpdateData': new FormGroup({
			'updatedFirstName': new FormControl(null, [Validators.required]),
			'updatedLastName': new FormControl(null, [Validators.required, ]),
      'updatedAmount': new FormControl(null, [Validators.required]),
			'updatedAddress': new FormControl(null, [Validators.required, ]),
      'updatedMobileNumber': new FormControl(null, [Validators.required]),
			'updatedGift': new FormControl(null, []),
			}),
		});
  }

  resultHandler(resultData : any){
		let n = Object.keys(resultData).length;
		this.Users = [];
		for(let i=0; i<n; i++){
		this.Users.push(resultData[i]);
		}

	}

	onDelete(id: string){
		console.log(id);
		this.request.datatoDelete(id).subscribe(resultData => {
		this.resultHandler(resultData)
		})
	}

	onEdit(id:string, FirstName:string, LastName:string, amount:number, address:string, MobileNumber:number, gift:string, content:any){
    console.log("entered id"+ id);
		this.editFirstName = FirstName;
    this.editLastName = LastName;
    this.editAmount = amount;
    this.editAddress = address;
    this.editMobileNumber = MobileNumber;
    this.editGift = gift;
    this.editId = id;
		this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
		}

    onUpdate(){
		console.log("data updating")
		this.datatoUpdate.FirstName = this.UpdateForm.value.userUpdateData.updatedFirstName;
		this.datatoUpdate.LastName = this.UpdateForm.value.userUpdateData.updatedLastName;
    this.datatoUpdate.amount = this.UpdateForm.value.userUpdateData.updatedAmount,
    this.datatoUpdate.address = this.UpdateForm.value.userUpdateData.updatedAddress,
    this.datatoUpdate.MobileNumber = this.UpdateForm.value.userUpdateData.updatedMobileNumber,
    this.datatoUpdate.gift = this.UpdateForm.value.userUpdateData.updatedGift;

    this.request.datatoUpdate(this.editId, this.datatoUpdate).subscribe(resultData =>{
      this.resultHandler(resultData);
    })
		this.modalReference.close();
	}

}
