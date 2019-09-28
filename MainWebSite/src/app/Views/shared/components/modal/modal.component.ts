import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() visible = false;
  @Input() size = 'md';
  @Input() onlyImage = false;
  @Output() onClose = new EventEmitter();
  @Input() manualCloseModal = false;
  visibleAnimate = false;
  sizeClass = 'modal-' + this.size;

  constructor() { }

  ngOnInit() {
    this.sizeClass = 'modal-' + this.size;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.visible.currentValue !== undefined) {
      changes.visible.currentValue ? this.show() : this.hide();
    }
  }

  show() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  hide() {
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.onClose.emit(false);
    }, 300);
  }

  onContainerClicked(event: MouseEvent) {
    if (!this.manualCloseModal) {
      if ((<HTMLElement>event.target).classList.contains('modal')) {
        this.onClose.emit(false);
      }
    }
  }

  handleClose() {
    this.onClose.emit(false);
  }
}
