import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUser, IServerModel, IMessage } from 'src/app/data-interface';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: IUser;
  public message: string;

  constructor( private http: HttpClient ) { }

  logUser(user: IUser) {
    this.http.post(`${apiUrl}/login`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.currentUser = res.items[0] as IUser;
        }

        return res;
      })
    );
  }

  createUser(user: IUser) {
    return this.http.post(`${apiUrl}/register`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.currentUser = res.items[0] as IUser;
        }

        return res;
      })
    );
  }
}
