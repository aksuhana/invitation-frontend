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
<<<<<<< HEAD
        'customAmount': new FormControl(null,[Validators.required, Validators.min(1)]),
        'gift': new FormControl(null)
      })
    })
    this.route.params.subscribe((params:Params)=>{
=======
        customAmount: new FormControl(null),
        gift: new FormControl(null),
      }),
    });
    this.route.params.subscribe((params: Params) => {
>>>>>>> addff4b9a5c52657adc2c5dc7db9ba798dcbc358
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
