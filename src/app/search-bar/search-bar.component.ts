import { Component, OnInit } from '@angular/core';
import { HttpApiService } from "../httpApi.service";
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchText='';
  guests = [];
  constructor(private apiServ: HttpApiService) { }

  ngOnInit(): void {
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
    this.apiServ.getData().subscribe(result=>{
      this.handler(result)
    })
  }
  //Select one guest
  onSelect(data:any){
    console.log(data);
    
  }
}
