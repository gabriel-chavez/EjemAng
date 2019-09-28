import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountsService } from '../../../../Services/accounts/accounts.service';
import { AccountNumberDto } from '../../../../Services/accounts/models/account-number-dto';
import { AccountOwnerResult } from '../../../../Services/accounts/models/account-owner-result';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.css'],
  providers: [AccountsService]
})
export class SearchAccountsComponent implements OnInit, OnChanges {

  request: AccountNumberDto = new AccountNumberDto();
  response: AccountOwnerResult = new AccountOwnerResult();
  @Input() accountNumber: string;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<AccountOwnerResult>;
  @ViewChild('searchAccountForm') form: NgForm;

  constructor(private accountsService: AccountsService, private globalService: GlobalService) {
    this.onChange = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.accountNumber !== undefined && !changes.accountNumber.isFirstChange()) {
      this.request.accountNumber = changes.accountNumber.currentValue;
      this.handleSearch();
    }
  }

  handleAccountNumberChanged() {
    this.response.owner = undefined;
    this.response.currency = undefined;
    this.onChange.emit(this.response);
  }

  handleSearch() {
    this.accountsService.getOwner(this.request).subscribe(response => {
        this.response = response;
        this.response.accountNumber = this.request.accountNumber;
        this.onChange.emit(this.response);
    }, error => {
      this.response.owner = error;
        this.onChange.emit(new AccountOwnerResult({
          owner: error
        }));
      });
  }

  handleValidate() {
    this.globalService.validateAllFormFields(this.form.form);
    if (this.response.currency == undefined) {
      this.globalService.warning("Titular", "El número de cuenta es incorrecto, revise la información ingresada y presione 'Titular cuenta' nuevamente.", true);
      return false;
    }
    return this.form.valid;
  }
}
