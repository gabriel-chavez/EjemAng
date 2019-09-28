import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-list-of-payments-schedules',
  templateUrl: './list-of-payments-schedules.component.html',
  styleUrls: ['./list-of-payments-schedules.component.css']
})
export class ListOfPaymentsSchedulesComponent implements OnInit {
  @Output() onChange = new EventEmitter<number>();
  @Input() disabled: boolean;
  isDisableAdd: boolean;
  constructor() {
    this.disabled = false;
   }
  ngOnInit() {
  }
  handleChanges($event) {
    this.isDisableAdd = true;
    this.onChange.emit($event);
  }
}

