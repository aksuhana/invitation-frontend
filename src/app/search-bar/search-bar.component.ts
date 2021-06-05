import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchText='';
  guests = [
    { name: "Shristi", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "Aakriti", address: "gdhsgdahs",mobile:"9836352781"},
    { name: "Radha", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "Yash", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "John", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "Shyam", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "Azra", address: "gdhsgdahs",mobile:"9836352781" },
    { name: "Diksha", address: "gdhsgdahs",mobile:"9836352781" }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(data:any){
     console.log(data)
  }
}
