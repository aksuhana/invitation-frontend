import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.css']
})
export class C1Component implements OnInit {
 invitationForm: FormGroup;
  customMode: boolean = false;
  priceTags = [100,200,300,400,500,600,1000,5000];
  constructor() { }

  ngOnInit(): void {

    this.invitationForm = new FormGroup({
      'userData': new FormGroup({
        'amount': new FormControl({ disabled: this.customMode},Validators.required , this.amountHandler.bind(this))
        ,'customAmount': new FormControl(null),
        'gift': new FormControl(null)
        })
    })

  }
onClick(){
  this.customMode = !this.customMode;
  console.log('button clicked')
}
amountHandler(control: FormControl): Promise<any> | Observable<any> {
  const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (control.value === 'test@test.com') {
        resolve({'emailIsForbidden': true});
      } else {
        resolve(null);
      }
    }, 1500);
  });
  return promise;
}

onSubmit(){

}
}
