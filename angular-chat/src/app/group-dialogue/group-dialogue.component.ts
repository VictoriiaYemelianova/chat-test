import { Component, OnInit, HostBinding, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt, faArrowLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IUser, IServerModel, IUserRoom, IParticipator } from '../data-interface';
import { ChatRoomService } from '../services/chat-room/chat-room.service';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss'],
})

export class GroupDialogueComponent implements OnInit {
  // @ViewChild('selectUsers') selectUsers: TemplateRef<any>;

  public currentUser: IUser;
  public users: Array<IUser>;
  public roomId: number;
  public chats: Array<IUserRoom>;
  public roomModel: IUserRoom;
  public createdRoom: IUserRoom;
  public roomMembers: IParticipator;

  public logout = faSignOutAlt;
  public arrowBack = faArrowLeft;
  public addChat = faPlus;
  public checkTick = faCheck;

  public tickUser: any = {};
  public selectedUsersId = [];
  public inputNameChat = 'Group-chat';

  public sizeMonitor = false;

  public innerWidth: any;
  public innerHeight: any;

  public click = false;
  public openModal = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private chatService: ChatRoomService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < 600) {
      this.sizeMonitor = true;
    }

    this.currentUser = this.userService.currentUserToken.user;

    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });

    this.chatService.getChats(this.currentUser.id).subscribe((res: IServerModel) => {
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

  addUser(event, idUser, index) {
    const foundUser = this.selectedUsersId.some(item =>  item === idUser);
    if (!foundUser) {
      this.selectedUsersId.push(idUser);
    } else {
      const indexEl = this.selectedUsersId.indexOf(idUser);
      this.selectedUsersId.splice(indexEl, 1);
    }

    this.tickUser[`${index}`] = event.target.checked;
  }

  onAddChat(idMember: number) {
    this.createRoom(idMember);
  }

  createRoom(idMember) {
    this.roomModel = {
      roomName: '',
      creator: this.currentUser.id
    };

    if (!this.selectedUsersId) {
      this.roomModel.roomName = 'privat-chat';
    } else {
      this.roomModel.roomName = this.inputNameChat;
    }

    this.chatService.createRoom(this.roomModel).subscribe((res: IServerModel) => {
      if (res.success) {
        this.createdRoom = res.items[0] as IUserRoom;
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRoom[];
        });

        this.addRoomMembers(idMember);
      }
    });
  }

  addRoomMembers(id) {
    this.roomMembers = {
      idRoom: this.createdRoom.id,
      participators: []
    };

    if (id) {
      this.roomMembers.participators.push(id);
    } else {
      this.roomMembers.participators = this.selectedUsersId;
      this.onOpenCloseModal();
    }

    this.roomMembers.participators.push(this.currentUser.id);
    this.chatService.createParticipators(this.roomMembers).subscribe((res: IServerModel) => {
      if (res.success) {
        this.selectedUsersId = [];
        this.tickUser = {};
      }
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
