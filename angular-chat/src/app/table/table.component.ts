import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { IUser, IServerModel } from '../data-interface';
import { faPencilAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public users: Array<IUser>;
  public update = faPencilAlt;
  public ban = faBan;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });
  }

  onUserBan(user) {
    console.log('click')
  }
}
