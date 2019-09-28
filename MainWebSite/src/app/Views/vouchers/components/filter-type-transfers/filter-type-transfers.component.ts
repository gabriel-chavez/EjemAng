import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-type-transfers',
  templateUrl: './filter-type-transfers.component.html',
  styleUrls: ['./filter-type-transfers.component.css']
})
export class FilterTypeTransfersComponent implements OnInit {

  filterType = 'send';
  @Input() disabled = false;
  @Output() onChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.handleChangeFilter();
  }

  handleChangeFilter() {
    this.onChange.emit(this.filterType);
  }
}
