import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpApiService } from "../httpApi.service";


@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {

  modalReference:any;
  addForm: FormGroup;
  submitted:boolean = false;
  guestData={
    name:'',
    address:'',
    mobile:0
  };
  guests=[]
  
  constructor( private modalService: NgbModal, private apiServ: HttpApiService ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'address': new FormControl(null),
      'mobile': new FormControl(null, [Validators.maxLength(10), Validators.minLength(10)])
    })
  }
  //Add Guests dat from server to component
  handler(result:any){
    let x = Object.keys(result).length;
    this.guests = [];
      for(let i=0;i<x;i++)
      {
        this.guests.push(result[i]);
      }
  }
  //Modal open
  onclick( modal:any){
    this.modalReference = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'})
  }
  //Add Guest
  onAddSubmit(){
    this.submitted = true;
    console.log(this.addForm);
    this.guestData.name= this.addForm.value.name;
    this.guestData.address= this.addForm.value.address;
    this.guestData.mobile = this.addForm.value.mobile;
    this.apiServ.postData(this.guestData).subscribe(result=>{
      this.handler(result)
    })
    this.addForm.reset() 
  }
  //Close Modal
  onclose(){
    this.modalReference.close();
  }
}
