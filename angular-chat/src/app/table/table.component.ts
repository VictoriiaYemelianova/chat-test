import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { IUser, IServerModel } from '../data-interface';
import { faPencilAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public users: Array<IUser>;
  public update = faPencilAlt;
  public ban = faBan;
  public openModal = false;
  public selectedUser: IUser;
  public changedUserName = 'swear';
  public reasonToBan = 'swearing';
  public userModel: IUser;

  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });
  }

  onUserBan(user) {
    this.closeOpenModal();
    this.selectedUser = user;
    this.changedUserName = `${this.changedUserName}(${user.login})`;
  }

  onBanUser() {
    this.userModel = {
      id: this.selectedUser.id,
      login: this.changedUserName,
      ban: true,
      reasonBan: this.reasonToBan
    };

    this.adminService.userBan(this.userModel).subscribe((res: IServerModel) => {
      if (res.success) {
        console.log(res.items);
      }
    });
    this.closeOpenModal();
  }

  closeOpenModal() {
    this.openModal = !this.openModal ;
  }
}
