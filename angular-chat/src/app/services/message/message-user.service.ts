import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from 'src/app/constants';
import { IUser, IServerModel, IUserToken, IMessage } from 'src/app/data-interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageUserService {
  private token: string;

  constructor( private http: HttpClient, private userSevice: UserService ) {
    this.token = this.userSevice.currentUserToken.token;
  }

  getAllMessage() {
    return this.http.get(`${apiUrl}/message`);
  }

  addNewMessage(message) {
    return this.http.post(`${apiUrl}/message/create`, message);
  }

  updateMessage() {}

  deleteMessage() {}

}
