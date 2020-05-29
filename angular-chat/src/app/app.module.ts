import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LogUserComponent } from './log-user/log-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { GroupDialogueComponent } from './group-dialogue/group-dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    LogUserComponent,
    CreateUserComponent,
    FirstPageComponent,
    GroupDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
