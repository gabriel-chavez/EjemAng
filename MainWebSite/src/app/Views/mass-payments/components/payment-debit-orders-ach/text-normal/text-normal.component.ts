import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-normal',
  templateUrl: './text-normal.component.html',
  styleUrls: ['./text-normal.component.css']
})
export class TextNormalComponent implements OnInit {

  txtValue: string;
  @Input() disabled: boolean;
  @Input() txtTitle: string;
  @Output() onChange = new EventEmitter<string>();

  constructor() {
    this.txtValue = '';
    this.disabled = false;
  }

  ngOnInit() {
  }
  handleSendDescription() {
    this.onChange.emit(this.txtValue);
  }

}
