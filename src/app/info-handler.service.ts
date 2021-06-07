import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {

  searchText:boolean = true;
  userAdded:boolean = false;
  userData = {
    name:"",
    address:"",
    mobile: 0
  }
  constructor() { }
}
