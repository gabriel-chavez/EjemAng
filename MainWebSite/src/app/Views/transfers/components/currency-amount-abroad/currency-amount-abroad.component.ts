import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { CurrencyAndAmountAbroad } from '../../../../Services/transfers-abroad/models/currency-and-amount-abroad';
import { ParameterCurrencyResult } from '../../../../Services/transfers-abroad/models/parameter-currency-result';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Constants } from '../../../../Services/shared/enums/constants';

@Component({
  selector: 'app-currency-amount-abroad',
  templateUrl: './currency-amount-abroad.component.html',
  styleUrls: ['./currency-amount-abroad.component.css'],
  providers: []
})
export class CurrencyAmountAbroadComponent implements OnInit {
  constants: Constants = new Constants();

  minimumAmountUIF: number;
  depositAmountInDollars: number;
  exchangeRate: number;
  showGetManadatoryTicketForm: boolean;
  currenciesTransfer: any; // CurrencyType = new CurrencyType();
  currencyFlag = '';
  data: CurrencyAndAmountAbroad = new CurrencyAndAmountAbroad();
  @Input() isFlagVisible: boolean;
  @Input() disabled: boolean;
  @Input() disabledAfterSave: boolean;
  @Input() currencies: ParameterCurrencyResult[] = [];
  @Output() onChangeCurrencyDestinationIsDollar = new EventEmitter<boolean>();
  @ViewChild('currencyAmountAbroadForm') form: NgForm;

  constructor(private globalService: GlobalService) {
    this.showGetManadatoryTicketForm = false;
    this.isFlagVisible = false;
    this.disabled = false;
    this.disabledAfterSave = false;

    this.currenciesTransfer = Constants.currencies.filter(x => x.value === Constants.currencyUsd);
    this.data.currencyTransfer = Constants.currencyUsd;
    this.data.currencyDestiny = Constants.currencyUsd;
  }

  ngOnInit() {
    this.handleCurrencyDestiny();
  }

  handleCurrencyDestiny() {
    this.currencyFlag = this.data.currencyDestiny;
    if (this.data.currencyDestiny === Constants.currencyUsd) {
      this.onChangeCurrencyDestinationIsDollar.emit(true);
    } else {
      this.onChangeCurrencyDestinationIsDollar.emit(false);
    }
  }

  handleValidate() {
    this.globalService.validateAllFormFields(this.form.form);
    if (this.form.valid) {
      if (this.data.currencyTransfer === this.data.currencyDestiny) {
        if (this.data.amountTransfer !== this.data.amountDestiny) {
          this.globalService.danger('Advertencia'
            , 'Cuando la moneda destino es dolares, el monto a transferir debe ser igual al monto del importe destino', true);
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
