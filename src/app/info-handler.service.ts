import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {

  private messageSource = new BehaviorSubject('no');
  currentMessage = this.messageSource.asObservable();
  userData = {
    name:"",
    address:"",
    mobile: 0
  }
  constructor() { }
  userSelected(message: string) {
    this.messageSource.next(message)
  }
}
