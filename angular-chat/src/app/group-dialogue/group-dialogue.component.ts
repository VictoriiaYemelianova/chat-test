import { Component, OnInit } from '@angular/core';
import { MessageUserService } from '../services/message/message-user.service';
import { IServerModel, IMessage } from '../data-interface';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

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

  constructor(
    private messageService: MessageUserService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
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
  }

  onSend() {
    const newMessageObj = {
      message: this.message,
      idUser: this.userId
    };

    this.messageService.addNewMessage(newMessageObj);
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
