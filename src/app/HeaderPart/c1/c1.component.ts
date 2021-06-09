import { HindiNameService } from './../../HindiName.service';
import { InfoHandlerService } from './../../info-handler.service';
import { RequestHandlerService } from './../../request-handler.service';
import {
  Component,
  DoCheck,
  Input,
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
export class C1Component implements OnInit, OnChanges,DoCheck {
  showHindi:boolean ;
  buttonClicked: boolean = false;
  messageId: string;
  searchMessage: string;
  subscription: Subscription;
  hindSub: Subscription;
  searchSub: Subscription;
  usersub: Subscription;
  paid: boolean = false;
  language: string;
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
<<<<<<< HEAD
    private _snackBar: MatSnackBar,private hindiNameService:HindiNameService
  ) {}
=======
    private _snackBar: MatSnackBar
  ) { }
>>>>>>> 37f114ab099f647926601e0a1b02315db967f83a

  ngOnInit(): void {
    this.usersub = this.infoHandler.currentMessage.subscribe(
      (searchMessage) => (this.searchMessage = searchMessage)
    );

    this.hindSub = this.hindiNameService.hindiMessage.subscribe(
      (language)=> this.language = language
    )
    this.subscription = this.UserUpdateService.currentId.subscribe(messageId => this.messageId = messageId)

    this.invitationForm = new FormGroup({
      userData: new FormGroup({
        amount: new FormControl(
          { disabled: this.customMode },
          Validators.required
          // ,this.amountHandler.bind(this)
        ),
        'customAmount': new FormControl(null, [Validators.required, Validators.min(1)]),
        'gift': new FormControl(null)
      })
    })
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


ngDoCheck(){
  if(this.language == 'hind')
  {
    this.showHindi = true;
  }
  else
  {
    this.showHindi = false;
  }
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
    if (!(+this.invitationForm.value.userData.amount) && !(this.customMode)) {
      this._snackBar.open("Please Select a value!!!!", "OK");
    }
    else {
      this.data.id = this.id;
      if (!this.customMode)
        this.data.item.amount = Number(this.invitationForm.value.userData.amount);
      else {
        this.data.item.amount = this.invitationForm.value.userData.customAmount;
      }
      this.data.item.gift = this.invitationForm.value.userData.gift;
      this.requestHandler.patchUsersWithAmount(this.data).subscribe(result => {

        console.log("Transaction Sucess!!!");
      })
      this.router.navigate([''], {})
      this.UserUpdateService.changeId(this.id)
      this.infoHandler.userSelected('no');
      this._snackBar.open("Transaction Sucessfull", "OK");

      this.buttonClick = true;
    }
  }
  get buttonClick() {
    return this.UserUpdateService.buttonClicked;
  }

  set buttonClick(buttonClick) {
    this.UserUpdateService.buttonClicked = buttonClick;
  }

  ngOnChanges() {
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
    this.subscription.unsubscribe();
    // this.usersub.unsubscribe();
  }
}
