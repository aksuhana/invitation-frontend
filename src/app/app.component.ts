import { Subscription } from 'rxjs';
import { InfoHandlerService } from './info-handler.service';
import { Component, ElementRef, Output } from '@angular/core';
import { HindiNameService } from './HindiName.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appsub: Subscription
  latestUserName: string=""
  currentUserName: string= ""
  title = 'invitation-frontend';
  language: string = "english";
  lang: any;
  constructor(private hindiService: HindiNameService,
              private infoHandler: InfoHandlerService) {

  }
  ngOnInit(){
    this.appsub = this.infoHandler.latest.subscribe(
      (latestUser)=>this.latestUserName=latestUser
    )
  }
  ngDoCheck(){
    if(this.latestUserName!==this.currentUserName)
    {
      this.currentUserName=this.latestUserName
      console.log(this.currentUserName)
    }
  }
  toggle() {
    if (this.language === "english") {
      this.language = "hindi";
      this.hindiService.LangSelected("hindi");
    }
    else
      if (this.language === "hindi") {
        this.language = "english";
        this.hindiService.LangSelected("english");
      }
  }
  onActivate(){
    console.log("event triggered!!!!!");
    console.log()
  }
}
