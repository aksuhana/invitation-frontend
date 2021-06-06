import { Component, OnInit } from '@angular/core';
import { HttpApiService } from "../httpApi.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchText='';
  guests = [];
  mainToggle:boolean =true;
  itemSelected:boolean = false;
  constructor(private apiServ: HttpApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.apiServ.getData().subscribe(result=>{
      this.handler(result)
    })
    
  }
  //add guests data from server to component
  handler(result:any){
    let x = Object.keys(result).length;
    this.guests = [];
      for(let i=0;i<x;i++)
      {
        this.guests.push(result[i]);
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
    this.itemSelected = true;
    this.router.navigate(['/user',data._id],{})
    this.searchText = "";
  }
}
