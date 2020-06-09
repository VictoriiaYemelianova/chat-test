import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from 'src/app/constants';
import { IServerModel } from 'src/app/data-interface';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageUserService {
  private token: string;
  public currentMessage = this.socket.fromEvent<IServerModel>('recieveMessage');
  public array = ['text', 'file', 'content', 'garlic', 'text2', 'content2', 'text5', 'text7', 'text3', 'text9'];

  constructor(
      private http: HttpClient,
      private userSevice: UserService ,
      private socket: Socket ) {
    this.token = this.userSevice.currentUserToken.token;
  }

  getAllMessage() {
    return this.http.get(`${apiUrl}/message`);
  }

  addNewMessage(message) {
    this.socket.emit('addMessage', message);
  }

  addFile(data) {
    return this.http.post(`${apiUrl}/upload-img`, data);
  }

  // getImgPath(id) {
  //   return this.http.get(`${apiUrl}/get-img:id`);
  // }

  updateMessage(message) {
    this.socket.emit('updateMessage', message);
  }

  deleteMessage(message) {
    this.socket.emit('updateMessage', message);
  }

}
