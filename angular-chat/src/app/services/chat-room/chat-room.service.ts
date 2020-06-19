import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/app/constants';
import { IUserRoom, IServerModel } from 'src/app/data-interface';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  public chats: BehaviorSubject<Array<IUserRoom>> = new BehaviorSubject<Array<IUserRoom>>([]);

  constructor(
    private http: HttpClient
  ) { }

  createRoom(data: IUserRoom) {
    return this.http.post(`${apiUrl}/create`, data).pipe(
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

  getChats(idUser) {
    return this.http.get(`${apiUrl}/chats/${idUser}`).pipe(
      map((resp: IServerModel) => {
        if (resp.success) {
          const currentChats = resp.items as IUserRoom[];
          this.chats.next(currentChats);
        }

        return resp;
      })
    );
  }
}
