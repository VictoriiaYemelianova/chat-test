import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user/user.service';
import { IServerModel } from '../data-interface';

@Component({
  selector: 'app-log-user',
  templateUrl: './log-user.component.html',
  styleUrls: ['./log-user.component.scss']
})
export class LogUserComponent implements OnInit {
  public errorMessage: string;
  public loginForm: FormGroup;

  constructor( private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',
      [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.userService.logUser(formValue)
    .subscribe((res: IServerModel) => {
      if (res.success) {
        this.router.navigate(['']);
      } else {
        this.errorMessage = res.message;
      }
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
