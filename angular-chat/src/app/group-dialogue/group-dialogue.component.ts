import { Component, OnInit } from '@angular/core';
import { MessageUserService } from '../services/message/message-user.service';
import { IServerModel, IMessage } from '../data-interface';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faDownload, faHamburger, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss']
})
export class GroupDialogueComponent implements OnInit {
  public message: string;
  public messages: Array<IMessage>;
  public userName: string;
  public userId: any;
  public usersOnlineList: Array<string>;
  public selectedFile: File;
  public imgSrc: IMessage;
  public upload = faDownload;
  public logout = faSignOutAlt;
  public humburger = faHamburger;

  public innerWidth: any;

  constructor(
    private messageService: MessageUserService,
    private userService: UserService,
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)

    this.userName = this.userService.currentUserToken.user.login;
    this.userId = this.userService.currentUserToken.user.id;

    this.messageService.getAllMessage().subscribe((res: IServerModel) => {
      if (res.success) {
        this.messages = res.items as IMessage[];
      }
    });

    this.messageService.currentMessage.subscribe((res: IServerModel) => {
      if (res.success) {
        this.messages.push(res.items[0] as IMessage);
      }
    });

    this.socketService.userNameOnline();

    this.socketService.usersOnline.subscribe((res: Array<string>) => {
      this.usersOnlineList = res;
    });
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSend() {
    const fd = new FormData();
    const newMessageObj = {
      message: null,
      idUser: this.userId,
      imgPath: null
    };

    if (this.message) {
      newMessageObj.message = this.message;
      this.messageService.addNewMessage(newMessageObj);
    }

    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);

      newMessageObj.message = fd;

      this.messageService.addFile(fd).subscribe((res: any) => {
        newMessageObj.imgPath = res.data;
        this.messageService.addNewMessage(newMessageObj);
      });
    }
    // this.messageService.createFile(this.message).subscribe(res => console.log(res));
    // this.messageService.addContentToCreatedFile(this.message).subscribe(res => console.log(res));
  }

  clickOnlineUser() {
    console.log('burger')
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
