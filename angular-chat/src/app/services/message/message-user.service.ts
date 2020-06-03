import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { urlSocket, apiUrl } from 'src/app/constants';
import { IUser, IServerModel, IUserToken, IMessage } from 'src/app/data-interface';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageUserService {
  private token: string;
  public currentMessage = this.socket.fromEvent<IServerModel>('recieveMessage');
  // public currentOnlineUsers = this.socket.fromEvent<any>('onlineUsers');
  public usersOnline = [];

  constructor(
      private http: HttpClient,
      private userSevice: UserService ,
      private socket: Socket ) {
    this.token = this.userSevice.currentUserToken.token;
  }

  getAllMessage() {
    return this.http.get(`${apiUrl}/message`);
  }

  getOnlineUser() {
    this.socket.emit('getOnline');
  }

  addNewMessage(message) {
    // return this.http.post(`${urlSocket}/message/create`, message);
    this.socket.emit('addMessage', message);
  }

  updateMessage(message) {
    this.socket.emit('updateMessage', message);
  }

  deleteMessage(message) {
    this.socket.emit('updateMessage', message);
  }

}
