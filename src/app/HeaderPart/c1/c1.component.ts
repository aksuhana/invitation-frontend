import { RequestHandlerService } from './../../request-handler.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.css']
})
export class C1Component implements OnInit {
  @Input() id: String;
  invitationForm: FormGroup;
  data = {
    id :"",
    item:{
      amount: 0,
      gift: ""
    }
  }
  customMode: boolean = false;
  priceTags = [100, 200, 300, 400, 500, 600, 1000, 5000];
  constructor(private requestHandler: RequestHandlerService) { }

  ngOnInit(): void {

    this.invitationForm = new FormGroup({
      'userData': new FormGroup({
        'amount': new FormControl({ disabled: this.customMode }, Validators.required
          // ,this.amountHandler.bind(this)
        ),
        'customAmount': new FormControl(null),
        'gift': new FormControl(null)
      })
    })

  }
  onClick() {
    this.customMode = !this.customMode;
    console.log('button clicked')
  }
  // amountHandler(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com') {
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });
  //   return promise;
  // }

  onSubmit() {

    if (!this.customMode)
      this.data.item.amount = Number(this.invitationForm.value.userData.amount);
    else {
      this.data.item.amount = this.invitationForm.value.userData.customAmount;
    }
    this.data.item.gift = this.invitationForm.value.userData.gift;
    console.log(this.data);
    this.requestHandler.patchUsersWithAmount(this.data).subscribe(result => {
      console.log("Transaction Sucess!!!");
    })
  }
}
