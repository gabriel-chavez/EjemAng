import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-pad',
  templateUrl: './number-pad.component.html',
  styleUrls: ['./number-pad.component.css']
})
export class NumberPadComponent implements OnInit {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  numberToken = '';
  isValidKey = false;
  @Input() maxLength = 10;
  @Output() onChangeText = new EventEmitter();

  constructor() {
    this.resetPad();
  }

  ngOnInit() {
  }

  handleOnClick($number) {
    this.isValidKey = (this.numberToken + $number).length >= this.maxLength;
    if ((this.numberToken + $number).length <= this.maxLength) {
      this.numberToken = this.numberToken + $number;
      this.onChangeText.emit(this.numberToken);
    }
  }

  handleOnClickLimpiar() {
    this.isValidKey = false;
    this.numberToken = '';
    this.onChangeText.emit(this.numberToken);
  }

  isValid() {
    return this.isValidKey;
  }

  resetPin() {
    this.numberToken = '';
  }

  resetPad() {
    this.isValidKey = false;
    this.numberToken = '';
    const { list } = this;
    let currentIndex = list.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = list[currentIndex];
      list[currentIndex] = list[randomIndex];
      list[randomIndex] = temporaryValue;
    }
    return list;
  }
}
