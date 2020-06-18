import { Component, OnInit, HostBinding } from '@angular/core';
// import { MessageUserService } from '../services/message/message-user.service';
// import { IServerModel, IMessage } from '../data-interface';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IUser, IServerModel } from '../data-interface';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss'],
})

export class GroupDialogueComponent implements OnInit {
  public userName: string;
  public userId: any;
  // public usersOnlineList = [];
  public users: Array<IUser>;
  public logout = faSignOutAlt;
  public arrowBack = faArrowLeft;
  public addChat = faPlus;

  public sizeMonitor = false;

  public innerWidth: any;
  public innerHeight: any;

  public click = false;

  constructor(
    // private messageService: MessageUserService,
    private userService: UserService,
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < 600) {
      this.sizeMonitor = true;
    }

    this.userName = this.userService.currentUserToken.user.login;
    this.userId = this.userService.currentUserToken.user.id;

    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });

    // this.socketService.userNameOnline(null);

    // this.socketService.usersOnline.subscribe((res: any) => {
    //   this.usersOnlineList.push(res);
    // });
  }

  openChat(name) {
    this.click = !this.click;
  }

  onAddChat() {}

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
