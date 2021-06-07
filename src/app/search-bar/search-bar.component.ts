import { InfoHandlerService } from './../info-handler.service';
import { Component, ElementRef, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { HttpApiService } from "../httpApi.service";
import { Router } from '@angular/router';
import {  FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('s') search: ElementRef;
  modalReference:any;
  addForm: FormGroup;
  submitted:boolean = false;
  guestData={
    name:'',
    address:'',
    mobile:0,
    isPaid:false
  };
  
  searchText='';
  guests = [];
  mainToggle:boolean =true;
  itemSelected:boolean = false;
  notFound:boolean=false;
  constructor(private apiServ: HttpApiService,private modalService: NgbModal,
    private router: Router,
    private infoHandler: InfoHandlerService) { }

  ngOnInit(): void {
    // console.log("on init called");
    this.apiServ.getData().subscribe(result=>{
      this.handler(result)
    })
    this.addForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'address': new FormControl(null),
      'mobile': new FormControl(null, [Validators.maxLength(10), Validators.minLength(10)])
    })

  }
 
  //add guests data from server to component
  handler(result:any){
    let x = Object.keys(result).length;
    this.guests = [];
      for(let i=0;i<x;i++)
      {
        this.guests.push(result[i]);
        // console.log("Paid-----------"+result[i].amount)
        if(Number(result[i].amount))
        {
          result[i].isPaid=true;
        }
      }
  }
  ngDoCheck(){
    if(this.infoHandler.searchText===false)
    {
      this.search.nativeElement.disabled=false;
    }
  }
  //GET Data from server
  onClick(){
    this.itemSelected = false;
    this.apiServ.getData().subscribe(result=>{
      this.handler(result)
    })
  }
  //Select one guest
  onSelect(data:any){
    this.mainToggle = false;
    //this is to add disable text field feature in form after the particular user is selected
    this.search.nativeElement.disabled=true;
    this.itemSelected = true;
    this.router.navigate(['/user',data._id],{})
    this.searchText = "";
  }
  onNewGuest(){
    this.notFound=true;
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
