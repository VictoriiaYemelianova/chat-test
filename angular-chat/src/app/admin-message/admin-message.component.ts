import { Component, OnInit, ElementRef } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user/user.service';

import * as socketIo from 'socket.io-client';

import { MessageUserService } from '../services/message/message-user.service';
import { SocketService } from '../services/socket/socket.service';
import { IServerModel, IMessage, IRoom } from '../data-interface';
import { ChatRoomService } from '../services/chat-room/chat-room.service';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

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
  public messages: Array<IMessage> = [];
  public chatName: string;
  public createdRoom: IRoom;

  constructor(
    private el: ElementRef,
    private userService: UserService,
    private socketService: SocketService,
    private messageService: MessageUserService,
    private chatService: ChatRoomService
    ) {
    this.chatOpened = false;
  }

  ngOnInit(): void {
    this.chatName = 'admin-chat-room';
    this.userId = this.userService.currentUserToken.user.id;

    this.messageService.currentMessage.subscribe((resp: IServerModel) => {
      if (resp.success) {
        this.messages.push(resp.items[0] as IMessage);
      }
    });

    // this.messageService.getAllMessage(this.chatName).subscribe((res: IServerModel) => {
    //   if (res.success) {
    //     this.messages = res.items as IMessage[];
    //   }
    // });
  }

  openCloseChat() {
    this.chatOpened = !this.chatOpened;

    if (this.chatOpened) {
      const chatModel = {
        roomName: this.chatName,
        creatorId: this.userId
      };

      this.getPosition();
      this.chatService.createRoom(chatModel).subscribe((res: IServerModel) => {
        if (res.success) {
          this.socketService.switchRoom(this.chatName);
          this.createdRoom = res.items[0] as IRoom;
          this.messageService.getAllMessage(this.createdRoom.idRoom).subscribe((resp: IServerModel) => {
            if (resp.success) {
              this.messages = resp.items as IMessage[];
            }
          });
        }
      });
    } else {
      this.socketService.switchRoom('/');
    }
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

  createChat() {

  }

  sendMessage() {
    const newMessageObj = {
      message: this.message,
      idUser: this.userId,
      roomId: this.createdRoom.id
    };

    this.messageService.addNewMessage(newMessageObj);
  }
}
