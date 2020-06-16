import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserService } from '../user/user.service';
import { IUserData } from 'src/app/data-interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public userData: IUserData;
  public usersOnline: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  constructor(
    private userService: UserService,
    private socket: Socket
    ) {
      this.socket.fromEvent<string>('resUserOnline').subscribe((data: any) => {
        const currentUsersList = data;
        this.usersOnline.next(currentUsersList);
      });

      this.userService.subject.subscribe((res: boolean) => {
        if (res) {
          this.socket.connect();
        } else {
          this.socket.disconnect();
        }
      });
    }

    userNameOnline(userRoom) {
      this.userData = {
        userName: '',
        room: 'string'
      };

      this.userData.userName =  this.userService.currentUserToken.user.login;
      if (!userRoom) {
        this.userData.room = '/';
      } else {
        this.userData.room = userRoom;
      }

      this.socket.emit('onlineUser', this.userData);
    }

    switchRoom(roomName) {
      this.socket.emit('switchRoom', roomName);
    }
}
