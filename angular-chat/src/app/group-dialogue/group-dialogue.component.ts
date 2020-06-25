import { Component, OnInit, HostBinding, ViewChild, TemplateRef } from '@angular/core';
// import { MessageUserService } from '../services/message/message-user.service';
// import { IServerModel, IMessage } from '../data-interface';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt, faArrowLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IUser, IServerModel, IUserRoom, IChatModel, IUserRooms } from '../data-interface';
import { ChatRoomService } from '../services/chat-room/chat-room.service';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss'],
})

export class GroupDialogueComponent implements OnInit {
  @ViewChild('selectUsers') selectUsers: TemplateRef<any>;

  public userOwn: IUser;
  // public usersOnlineList = [];
  public users: Array<IUser>;
  public roomId: number;
  public chats: Array<IUserRooms>;
  public chatModel: IChatModel;

  public logout = faSignOutAlt;
  public arrowBack = faArrowLeft;
  public addChat = faPlus;
  public checkTick = faCheck;

  public tickUser = false;
  public selectedUsers = [];
  public inputNameChat = '';

  public sizeMonitor = false;

  public innerWidth: any;
  public innerHeight: any;

  public click = false;
  public openModal = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private chatService: ChatRoomService,
    private socketService: SocketService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < 600) {
      this.sizeMonitor = true;
    }

    this.userOwn = this.userService.currentUserToken.user;

    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });

    this.chatService.getChats(this.userOwn.id).subscribe((res: IServerModel) => {
      if (res.success) {
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRooms[];
        });
      }
    });

    // this.socketService.userNameOnline(null);

    // this.socketService.usersOnline.subscribe((res: any) => {
    //   this.usersOnlineList.push(res);
    // });
  }

  openChat(id, roomName) {
    this.roomId = id;
    this.socketService.switchRoom(roomName);
    this.click = !this.click;
  }

  closeChat() {
    this.click = !this.click;
    this.socketService.switchRoom(null);
  }

  onOpenCloseModal() {
    this.openModal = !this.openModal;
  }

  addUser(event, user) {
    this.selectedUsers.push(user);
    this.tickUser = event.target.checked;
  }

  // changeInput(event) {
  //   console.log(event.target.checked)
  //   this.tickUser = event.target.checked;
  // }

  onAddChat(user) {
    this.chatModel = {
      roomName: '',
      creatorId: this.userOwn.id,
      participator: []
    };

    if (user) {
      this.chatModel.roomName = 'one-off chat';
      this.chatModel.participator.push(user.id);
    } else {
      this.chatModel.roomName = this.inputNameChat;
      this.chatModel.participator = this.selectedUsers.map(el => {
        return el.id;
      });

      this.onOpenCloseModal();
    }

    this.chatModel.participator.push(this.userOwn.id);

    this.chatService.createRoom(this.chatModel).subscribe((res: IServerModel) => {
      if (res.success) {
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRooms[];
        });
      }
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
