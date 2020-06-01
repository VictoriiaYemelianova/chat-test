import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user/user.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private userSevice: UserService) {
    this.token = this.userSevice.currentUserToken.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token
      })
    });

    console.log(tokenReq);
    return next.handle(tokenReq);
  }
}
