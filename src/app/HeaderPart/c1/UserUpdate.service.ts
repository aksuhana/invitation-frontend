import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  private messageSource = new BehaviorSubject('no');
  currentId = this.messageSource.asObservable();
  buttonClicked: boolean = false;
  constructor() {
    console.log('new instance created');
  }

  changeId(messageId: string) {
    this.messageSource.next(messageId)
  }
}
