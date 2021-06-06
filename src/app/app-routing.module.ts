import { SearchBarComponent } from './search-bar/search-bar.component';
import { AppComponent } from './app.component';
import { C1Component } from './HeaderPart/c1/c1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "user/:id", component:C1Component },
  // {path: "" , component: SearchBarComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
