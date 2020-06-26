import { Component, OnInit, HostBinding, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt, faArrowLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IUser, IServerModel, IUserRoom, IChatModel, IRoom } from '../data-interface';
import { ChatRoomService } from '../services/chat-room/chat-room.service';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss'],
})

export class GroupDialogueComponent implements OnInit {
  @ViewChild('selectUsers') selectUsers: TemplateRef<any>;

  public userOwn: IUser;
  public users: Array<IUser>;
  public roomId: number;
  public chats: Array<IUserRoom>;
  public roomModel: IUserRoom;

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
          this.chats = resp as IUserRoom[];
        });
      }
    });
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

  onAddChat(idUser: number) {
    this.createRoom(idUser);

  }

  createRoom(id: number) {
    this.roomModel = {
      roomName: '',
      creator: id
    };

    if (id) {
      this.roomModel.roomName = 'privat-chat';
    } else {
      this.roomModel.roomName = this.inputNameChat;

      this.onOpenCloseModal();
    }


    this.chatService.createRoom(this.roomModel).subscribe((res: IServerModel) => {
      if (res.success) {
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRoom[];
        });
      }
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
