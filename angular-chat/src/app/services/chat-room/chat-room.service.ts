import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/app/constants';
import { IUserRoom } from 'src/app/data-interface';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(
    private http: HttpClient
  ) { }

  createRoom(data: IUserRoom) {
    return this.http.post(`${apiUrl}/create`, data);
  }
}
