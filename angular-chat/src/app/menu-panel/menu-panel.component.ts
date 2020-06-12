import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, animate, state, transition, style, keyframes } from '@angular/animations';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit {
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  @Input() height: any;

  public humburgerClick = false;
  public humburger = faHamburger;

  constructor() { }

  ngOnInit(): void {
  }

  onHumburger() {
    this.humburgerClick = true;
  }

  closeMenu() {
    this.humburgerClick = false;
  }

  logOut() {
    this.onLogout.emit(true);
  }
}
