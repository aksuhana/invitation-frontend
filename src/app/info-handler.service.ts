import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {

  userAdded:boolean = false;
  userData = {
    name:"",
    address:"",
    mobile: 0
  }
  constructor() { }
}
