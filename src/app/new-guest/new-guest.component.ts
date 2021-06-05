import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {
  modalReference:any;
  addForm: FormGroup;
  
  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'address': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'mobile': new FormControl(null, [Validators.maxLength(10), Validators.minLength(10)])
    })
  }

  // handler(result:any){
  //   let x = Object.keys(result).length;
  //   this.arr = [];
  //     for(let i=0;i<x;i++)
  //     {
  //       this.arr.push(result[i]);
  //     }
  // }

  onclick( modal:any){
    this.modalReference = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'})
  }
  onAddSubmit(){
    console.log('----onAddSubmit')  

    this.addForm.reset() 
  }
  onclose(){
    this.modalReference.close();

  }
}
