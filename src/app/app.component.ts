import { Component } from '@angular/core';
import { HindiNameService } from './HindiName.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invitation-frontend';
  language: string = "english";
  lang: any;
  constructor(private hindiService: HindiNameService) {

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
}
