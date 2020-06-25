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
      this.userService.subject.subscribe((res: boolean) => {
        if (res) {
          this.socket.connect();
        } else {
          this.socket.disconnect();
        }
      });
    }

    switchRoom(roomName) {
      this.socket.emit('switchRoom', roomName);
    }
}
