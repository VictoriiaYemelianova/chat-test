import { Component, OnInit, ElementRef } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user/user.service';

import * as socketIo from 'socket.io-client';

import { MessageUserService } from '../services/message/message-user.service';
import { SocketService } from '../services/socket/socket.service';
import { IServerModel, IMessage } from '../data-interface';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {
  public userId: any;
  public chatOpened: boolean;
  public positionEl: number;
  public message: string;
  public arrowRight = faPlay;
  public messages: Array<IMessage>;

  constructor(
    private el: ElementRef,
    private userService: UserService,
    private socketService: SocketService,
    private messageService: MessageUserService
    ) {
    this.chatOpened = false;
  }

  ngOnInit(): void {
    this.userId = this.userService.currentUserToken.user.id;

    this.messageService.currentMessage.subscribe((res: IServerModel) => {
      if (res.success) {
        this.messages = [];
        this.messages.push(res.items[0] as IMessage);
      }
    });
  }

  openCloseChat() {
    if (!this.chatOpened) {
      this.getPosition();
      this.socketService.switchRoom('admin-chat-room');
    } else {
      this.socketService.switchRoom('/');
    }
    this.chatOpened = !this.chatOpened;
  }

  getPosition() {
    const positionNativeEl = this.el.nativeElement.getBoundingClientRect();
    const pageHeight = window.innerHeight;
    const bottom = positionNativeEl.bottom - pageHeight;

    if (positionNativeEl.top >= 300) {
      this.positionEl = positionNativeEl.top - 300;
    }

    if (bottom > 300) {
      this.positionEl = positionNativeEl.bottom - positionNativeEl.height;
    }

    return this.positionEl;
  }

  sendMessage() {
    const newMessageObj = {
      message: this.message,
      idUser: this.userId
    };

    this.messageService.addNewMessage(newMessageObj);
  }
}
