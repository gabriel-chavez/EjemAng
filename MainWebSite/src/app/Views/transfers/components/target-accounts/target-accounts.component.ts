import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TargetDataTransferModel } from './../../../../Services/transfers/models/target-data-transfer-model';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { AccountResult } from '../../../../Services/accounts/models/account-result';
import { MyAccountsComponent } from '../../../shared/components/my-accounts/my-accounts.component';

@Component({
  selector: 'app-target-accounts',
  templateUrl: './target-accounts.component.html',
  styleUrls: ['./target-accounts.component.css'],
})
export class TargetAccountsComponent implements OnInit {

  @Input() accountRequest: AccountDto = new AccountDto();
  @Input() disabled: boolean;
  @Input() flag: true;
  @Output() onChange: EventEmitter<AccountResult>;
  @ViewChild('targetAccountForm') form: NgForm;

  constructor() {
    this.disabled = false;
    this.onChange = new EventEmitter();
  }

  ngOnInit() {
  }

  handleAccountChanged($event) {
    this.onChange.emit($event);
  }

  isValid() {
    return this.form.valid;
  }
}
