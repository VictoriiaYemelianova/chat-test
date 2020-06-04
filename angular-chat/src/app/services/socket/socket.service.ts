import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public usersOnline: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  constructor(
    private userService: UserService,
    private socket: Socket
    ) {
      this.socket.fromEvent<string>('resUserOnline').subscribe((data: any) => {
        const currentUsersList = data;
        console.log(currentUsersList);
        this.usersOnline.next(currentUsersList);
      });
    }

    userNameOnline() {
      const user =  this.userService.currentUserToken.user.login;

      this.socket.emit('onlineUser', user);
    }
}
