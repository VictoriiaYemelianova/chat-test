import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user/user.service';
import { IServerModel } from '../data-interface';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-log-user',
  templateUrl: './log-user.component.html',
  styleUrls: ['./log-user.component.scss']
})
export class LogUserComponent implements OnInit {
  public errorMessage: string;
  public loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private socketService: SocketService
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',
      [Validators.required, Validators.pattern(/^[\D]+@[a-z]{2,}\.[a-z]{2,}/g)]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.userService.logUser(formValue)
    .subscribe((res: IServerModel) => {
      if (res.success) {
        this.socketService.userNameOnline();
        this.router.navigate(['/group-dialogue']);
      } else {
        this.errorMessage = res.message;
      }
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
