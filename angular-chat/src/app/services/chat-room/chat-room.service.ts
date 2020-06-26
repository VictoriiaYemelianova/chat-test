import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/app/constants';
import { IUserRoom, IServerModel, IParticipator } from 'src/app/data-interface';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  public chats: BehaviorSubject<Array<IUserRoom>> = new BehaviorSubject<Array<IUserRoom>>([]); //хранятся id комнат в массиве

  constructor(
    private http: HttpClient
  ) { }

  createRoom(data: IUserRoom) {
    return this.http.post(`${apiUrl}/create-room`, data).pipe(
      map((resp: IServerModel) => {
        if (resp.success) {
          const currentChats = this.chats.value;
          currentChats.push(resp.items[0] as IUserRoom);
          this.chats.next(currentChats);
        }

        return resp;
      })
    );
  }

  createParticipators(data: IParticipator) {
    return this.http.post(`${apiUrl}/add-participators`, data);
  }

  getChats(idUser) {
    return this.http.get(`${apiUrl}/chats/${idUser}`).pipe(
      map((resp: IServerModel) => {
        if (resp.success) {
          const currentChatsArray = resp.items as IUserRoom[];
          this.chats.next(currentChatsArray);
        }

        return resp;
      })
    );
  }
}
