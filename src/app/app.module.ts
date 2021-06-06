import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { FilterPipe } from './user-data/filter.pipe';
import { RequestHandlerService } from './request-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { C1Component } from './HeaderPart/c1/c1.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    FilterPipe,
    C1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
