import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DebitForOperationModel } from '../../../../Services/shared/models/debit-for-operation-model';

@Component({
  selector: 'app-debit-for-operation',
  templateUrl: './debit-for-operation.component.html',
  styleUrls: ['./debit-for-operation.component.css']
})
export class DebitForOperationComponent implements OnInit {

  debitForOperation: DebitForOperationModel = new DebitForOperationModel();
  @Output() onChange = new EventEmitter<DebitForOperationModel>();
  @Input() disabled: boolean;
  constructor() {
    this.disabled = false;
  }

  ngOnInit() {
    this.debitForOperation.isMultipleDebit = false;
    this.onChange.emit(this.debitForOperation);
  }
  handleChangeChecked(event: boolean) {
    this.debitForOperation.isMultipleDebit = event;
    this.onChange.emit(this.debitForOperation);
  }

}
