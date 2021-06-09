import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HindiNameService {

  private hindiSource = new BehaviorSubject('english');
  hindiMessage = this.hindiSource.asObservable();
  constructor() { }
  LangSelected(message: string) {
    this.hindiSource.next(message)
  }
}
