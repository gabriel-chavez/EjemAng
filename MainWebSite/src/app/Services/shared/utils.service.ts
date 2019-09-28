import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IMyDate } from 'mydatepicker';
import { Observable } from 'rxjs';
import { ExchangeRatesService } from '../exchange-rates/exchange-rates.service';
import { Constants } from './enums/constants';
import { GlobalService } from './global.service';
import { AccountClientResult } from '../mass-payments/Models/account-client-result';
import { NumberToLiteral } from './models/numeral-to-literal';
import { ValidateConst } from '../../Directives/validate-const';

@Injectable()
export class UtilsService {

  private currencies = 'config/currency-flags.json';
  saleExchangeRate: number;

  constructor(private exchangeRatesService: ExchangeRatesService, private messageService: GlobalService, private _http: Http) {
    this.exchangeRatesService.getLastOne()
      .subscribe(response => this.saleExchangeRate = response.purchase);
  }

  getToday(): IMyDate {
    const date = new Date();
    const modelDate: IMyDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    return modelDate;
  }

  changeAmountBolToUsd(amount: number): number {
    return +amount / this.saleExchangeRate;
  }

  changeAmountUsdToBol(amount: number): number {
    return amount * this.saleExchangeRate;
  }

  validateAmount(sourceCurrency: string, sourceAmount: number, destinationCurrency: string, destinationAmount: number): boolean {
    sourceAmount = +sourceAmount;
    destinationAmount = +destinationAmount;
    if (sourceCurrency === Constants.currencyBol) {
      sourceAmount = this.changeAmountBolToUsd(sourceAmount);
    }
    if (destinationCurrency === Constants.currencyBol) {
      destinationAmount = this.changeAmountBolToUsd(destinationAmount);
    }
    return sourceAmount < destinationAmount;
  }

  getCurrencyFlags(): Observable<Response> {
    const { _http, currencies } = this;
    return _http.get(`${currencies}`);
  }

  countErrorsMassivePayments($event: AccountClientResult[]) {
    let c = 0;
    for (let i = 0; i < $event.length; i++) {
      if (!$event[i].isOk) { c++; }
    }
    if (c > 10) {
      return false;
    } else {
      return true;
    }
  }

  public donwloadReport(nameReport: string, report: Blob) {
    if (navigator.msSaveBlob) {
      return navigator.msSaveOrOpenBlob(report, nameReport);
    }
    const data = window.URL.createObjectURL(report);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = nameReport;
    link.target = '_ self';
    link.click();
  }

  public validateAmountZero($event: any) {
    const errorMessages = ValidateConst;
    const validateInteger = errorMessages.find(x => x.type === 'integer');
    const validateGloss = errorMessages.find(x => x.type === 'alphanumericBasicSymbols');

    let isValidAccount = true;
    let isValidTarget = true;
    let isValidAccountD = true;
    let isValidGloss = true;
    let isValidGlossPayment = true;

    for (let i = 0; i < $event.detail.length; i++) {
      let accountNumber = $event.detail[i].accountNumber;
      let targetAccount = $event.detail[i].targetAccount;
      let destinationAccount = $event.detail[i].destinationAccount;
      let gloss = $event.detail[i].gloss;
      let glossPayment = $event.detail[i].glossPayment;

      if (accountNumber != undefined || accountNumber === '') {
        isValidAccount = validateInteger.regex.test(accountNumber);
      }
      else if (targetAccount != undefined || targetAccount === '') {
        isValidTarget = validateInteger.regex.test(targetAccount);
      }
      else if (destinationAccount != undefined|| destinationAccount === '') {
        isValidAccountD = validateInteger.regex.test(destinationAccount);
      }
    
      if (gloss != undefined || gloss === '') {
        isValidGloss = validateGloss.regex.test(gloss);
      }
      else if (glossPayment != undefined || glossPayment === '') {
        isValidGlossPayment = validateGloss.regex.test(glossPayment);
      }
      if ($event.detail[i].amount === 0 || (!isValidAccount || !isValidTarget || !isValidAccountD) || (!isValidGloss || !isValidGlossPayment)) {
        $event.detail[i].isEdit = true;
      }
    }
  }

  public validateRows($event: any) {
    if ($event.find(x => x.isEdit === true)) {
      return true;
    } else {
      return false;
    }
  }

  public convertToLiteral(amount: number) {
    const asd = new NumberToLiteral();
    return asd.convertToLiteral(amount);
  }
}
