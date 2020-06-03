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
    if (this.userSevice.currentUserToken) {
      this.token = this.userSevice.currentUserToken.token;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login') || req.url.includes('register')) {
      return next.handle(req);
    }

    console.log(req);
    const tokenReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token
      })
    });

    return next.handle(tokenReq);
  }
}
