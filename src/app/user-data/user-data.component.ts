import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpAPIRequestService } from './HttpAPIRequest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateService } from '../HeaderPart/c1/UserUpdate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  @ViewChild('scrollContent') scrollContent: any;
  scrollPosition = 0;
  deletemodalReference: any; modalReference: any;
  searchText = '';
  Users = [];
  UpdateForm: FormGroup;
  totalAmount: number = 0; amountCalculate: number = 0;
  editName = ''; editAmount: number; editAddress = ''; editMobile: number;  editGift = ''; editId = '';
  confirmDeleteId :any; confirmDeleteName : any;
  message: string;
  subscription: Subscription;
  datatoUpdate = { name: '', amount: 0, address: '', mobile: 9999999999, gift: '' };


  constructor(
    private request: HttpAPIRequestService,
    private http: HttpClient,
    private modalService: NgbModal,
    private UserUpdateService: UserUpdateService,
    private deletemodalService: NgbModal
  ) {}

  resultHandler(resultData: any, checkDeleteUpdate: any, amountSend:any) {
    let n = Object.keys(resultData).length;
    this.Users = [];
    if(amountSend)
    {
      this.totalAmount = 0;
    }
    for (let i = 0; i < n; i++) {
      if (resultData[i].amount) {
        this.Users.push(resultData[i]);
        if (!checkDeleteUpdate) {
          this.totalAmount = this.totalAmount + resultData[i].amount;
        }
        if (amountSend) {
          this.totalAmount = this.totalAmount + resultData[i].amount;
        }
      }
    }
    if (!checkDeleteUpdate) {
      setInterval(() => {
        this.scrollContent.nativeElement.scrollTop +=
          this.scrollContent.nativeElement.scrollHeight / this.Users.length;
        if (this.scrollContent.nativeElement.scrollTop == this.scrollPosition) {
          this.scrollContent.nativeElement.scrollTop = 0;
        } else {
          this.scrollPosition = this.scrollContent.nativeElement.scrollTop;
        }
        this.subscription = this.UserUpdateService.currentMessage.subscribe(
          (message) => (this.message = message)
        );

        if (this.message == 'yes') {
          this.request.datatoGet().subscribe((resultData) => {
            this.resultHandler(resultData, true, true);
          });

        }
        this.UserUpdateService.changeMessage('no');
        this.subscription.unsubscribe();
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.request.datatoGet().subscribe((resultData) => {
      this.resultHandler(resultData, false,false);
    });
    this.UpdateForm = new FormGroup({
      userUpdateData: new FormGroup({
        updatedName: new FormControl(null, [Validators.required]),
        updatedAmount: new FormControl(null, [Validators.required]),
        updatedAddress: new FormControl(null, []),
        updatedMobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
        updatedGift: new FormControl(null, []),
      }),
    });
  }

  onDelete(id: string, name: string, content:any) {
    this.confirmDeleteId = id;
    this.confirmDeleteName = name;
    this.deletemodalReference = this.deletemodalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.confirmDeleteId = id;
    this.confirmDeleteName = name;
  }

  onConfirmDelete(){
    this.request.datatoDelete(this.confirmDeleteId).subscribe((resultData) => {
      this.resultHandler(resultData, true,false);
    });
    const user = this.Users.find((x) => x.name == this.confirmDeleteName);
    this.totalAmount = this.totalAmount - user.amount;
    this.deletemodalReference.close();
  }

  onEdit(
    id: string,
    name: string,
    amount: number,
    address: string,
    mobile: number,
    gift: string,
    content: any
  ) {
    this.editName = name;
    this.editAmount = amount;
    this.editAddress = address;
    this.editMobile = mobile;
    this.editGift = gift;
    this.editId = id;
    this.amountCalculate = this.editAmount;
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onUpdate() {
    this.datatoUpdate.name = this.UpdateForm.value.userUpdateData.updatedName;
    (this.datatoUpdate.amount =
      this.UpdateForm.value.userUpdateData.updatedAmount),
      (this.datatoUpdate.address =
        this.UpdateForm.value.userUpdateData.updatedAddress),
      (this.datatoUpdate.mobile =
        this.UpdateForm.value.userUpdateData.updatedMobile),
      (this.datatoUpdate.gift =
        this.UpdateForm.value.userUpdateData.updatedGift);
    this.request
      .datatoUpdate(this.editId, this.datatoUpdate)
      .subscribe((resultData) => {
        this.resultHandler(resultData, true,false);
      });
    this.totalAmount =
      this.totalAmount -
      Number(this.amountCalculate) +
      Number(this.datatoUpdate.amount);
    this.modalReference.close();
  }
}
