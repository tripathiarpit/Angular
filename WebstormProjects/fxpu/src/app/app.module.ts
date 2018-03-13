import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {LoginModule} from './login/login-module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    FormsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
