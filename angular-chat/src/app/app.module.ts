import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LogUserComponent } from './log-user/log-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { GroupDialogueComponent } from './group-dialogue/group-dialogue.component';
import { ParamInterceptor } from './param.interceptor';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChangeColorDirective } from './directive/change-color.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { TableComponent } from './table/table.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LogUserComponent,
    CreateUserComponent,
    FirstPageComponent,
    GroupDialogueComponent,
    ChatPageComponent,
    ChangeColorDirective,
    MenuPanelComponent,
    AdminMessageComponent,
    ModalWindowComponent,
    TableComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
