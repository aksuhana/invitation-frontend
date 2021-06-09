import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  // private messageSource = new BehaviorSubject('no');
  // currentMessage = this.messageSource.asObservable();
  buttonClicked: boolean = false;
  constructor() {
    console.log('new instance created');
  }

  // changeMessage(message: string) {
  //   this.messageSource.next(message)
  // }
}
