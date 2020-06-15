import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {
  public chatOpened: boolean;
  public positionEl: number;

  constructor( private el: ElementRef ) {
    this.chatOpened = false;
  }

  ngOnInit(): void {
  }

  openChat() {
    if (!this.chatOpened) {
      this.getPosition();
    }
    this.chatOpened = !this.chatOpened;
  }

  getPosition() {
    const positionNativeEl = this.el.nativeElement.getBoundingClientRect();
    const pageHeight = window.innerHeight;
    const bottom = positionNativeEl.bottom - pageHeight;

    if (positionNativeEl.top >= 300) {
      this.positionEl = positionNativeEl.top - 300;
    }

    if (bottom > 300) {
      this.positionEl = positionNativeEl.bottom - positionNativeEl.height;
    }

    return this.positionEl;
  }
}
