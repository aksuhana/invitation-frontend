import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {
  private userSource = new BehaviorSubject('');
  private messageSource = new BehaviorSubject('no');
  currentMessage = this.messageSource.asObservable();
  latest = this.userSource.asObservable();
  userData = {
    name:"",
    address:"",
    mobile: 0
  }
  constructor() { }
  userSelected(message: string) {
    this.messageSource.next(message)
  }
  latestUser(message: string){
    this.userSource.next(message)
  }
}
