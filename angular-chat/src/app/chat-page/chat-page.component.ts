import { Component, OnInit, Input } from '@angular/core';
import { MessageUserService } from '../services/message/message-user.service';
import { IServerModel, IMessage } from '../data-interface';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  @Input() roomId: number;

  public message: string;
  public messages: Array<IMessage>;
  public userName: string;
  public userId: any;
  public selectedFile: File;
  public imgSrc: IMessage;

  public upload = faDownload;

  public sizeMonitor = false;

  public innerWidth: any;
  public innerHeight: any;


  constructor(
    private messageService: MessageUserService,
    private socketService: SocketService,
    private http: HttpClient,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    console.log(this.roomId)
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < 600) {
      this.sizeMonitor = true;
    }

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

}
