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

  constructor(private userSevice: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login') || req.url.includes('register')) {
      return next.handle(req);
    }

    if (this.userSevice.currentUserToken) {
      this.token = this.userSevice.currentUserToken.token;

      const tokenReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token
        })
      });

      return next.handle(tokenReq);
    }

    return next.handle(req);
  }
}
