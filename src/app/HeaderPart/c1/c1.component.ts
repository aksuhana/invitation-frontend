import { InfoHandlerService } from './../../info-handler.service';
import { RequestHandlerService } from './../../request-handler.service';
import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserUpdateService } from '../c1/UserUpdate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.css'],
})
export class C1Component implements OnInit, OnChanges {
  buttonClicked: boolean = false;
  message: string;
  searchMessage: string;
  subscription: Subscription;
  searchSub: Subscription;
  usersub: Subscription;
  paid: boolean = false;
  id = '';
  invitationForm: FormGroup;
  data = {
    id: '',
    item: {
      amount: 0,
      gift: '',
    },
  };
  userDetail: {};

  customMode: boolean = false;
  priceTags = [100, 200, 300, 400, 500, 600, 1000, 5000];

  constructor(
    private requestHandler: RequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private UserUpdateService: UserUpdateService,
    private infoHandler: InfoHandlerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersub = this.infoHandler.currentMessage.subscribe(
      (searchMessage) => (this.searchMessage = searchMessage)
    );

    // this.subscription = this.UserUpdateService.currentMessage.subscribe(message => this.message = message)

    this.invitationForm = new FormGroup({
      userData: new FormGroup({
        amount: new FormControl(
          { disabled: this.customMode },
          Validators.required
          // ,this.amountHandler.bind(this)
        ),
        customAmount: new FormControl(null),
        gift: new FormControl(null),
      }),
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.requestHandler.getUserWithId(this.id).subscribe((result) => {
      this.userDetail = result;
      if (Number(this.userDetail['amount'])) {
        this.paid = true;
      }
    });
  }

  onClick() {
    this.customMode = !this.customMode;
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
    this.data.id = this.id;
    if (!this.customMode)
      this.data.item.amount = Number(this.invitationForm.value.userData.amount);
    else {
      this.data.item.amount = this.invitationForm.value.userData.customAmount;
    }
    this.data.item.gift = this.invitationForm.value.userData.gift;
    this.requestHandler.patchUsersWithAmount(this.data).subscribe((result) => {
      console.log('Transaction Sucess!!!');
    });
    this.router.navigate([''], {});
    // this.UserUpdateService.changeMessage('yes')
    this.infoHandler.userSelected('no');
    this._snackBar.open('Transaction Sucessfull', 'OK');

    this.buttonClick = true;
  }
  get buttonClick() {
    return this.UserUpdateService.buttonClicked;
  }

  set buttonClick(buttonClick) {
    this.UserUpdateService.buttonClicked = buttonClick;
  }

  ngOnChanges() {
    // this.subscription = this.UserUpdateService.currentMessage.subscribe(message => this.message = message)
    this.invitationForm = new FormGroup({
      userData: new FormGroup({
        amount: new FormControl(
          { disabled: this.customMode },
          Validators.required
          // ,this.amountHandler.bind(this)
        ),
        customAmount: new FormControl(null),
        gift: new FormControl(null),
      }),
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.requestHandler.getUserWithId(this.id).subscribe((result) => {
      this.userDetail = result;
      if (Number(this.userDetail['amount'])) {
        this.paid = true;
      }
    });
  }

  onCancel() {
    this.infoHandler.userSelected('no');
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.usersub.unsubscribe();
  }
}
