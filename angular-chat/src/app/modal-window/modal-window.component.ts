import { Component, OnInit, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() tickUser: EventEmitter<boolean> = new EventEmitter();

  public close = faWindowClose;

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

}
