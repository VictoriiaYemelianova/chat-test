import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUser, IServerModel } from 'src/app/data-interface';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: IUser;

  constructor( private http: HttpClient ) { }

  logUser(user: IUser) {
    this.http.post(`${apiUrl}/login`, user).subscribe((res: IServerModel) => {
      if (res.success) {
        //this.currentUser = res.
      }
    })
  }

  createUser(user: IUser) {
    return this.http.post(`${apiUrl}/register`, user);
  }
}
