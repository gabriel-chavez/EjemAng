import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { CreSaguapacDebt } from '../../../Services/service-payments/models/cre-saguapac-debt';
import { DelapazDebt } from '../../../Services/service-payments/models/delapaz-debt';
import { GetDebtRequest } from '../../../Services/service-payments/models/get-debt-request';
import { SendBill } from '../../../Services/service-payments/models/send-bill';
import { ServicePayment } from '../../../Services/service-payments/models/service-payment';
import { Telephony } from '../../../Services/service-payments/models/telephony';
import { ServicePaymentsService } from '../../../Services/service-payments/service-payments.service';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Constants } from '../../../Services/shared/enums/constants';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { Roles } from '../../../Services/shared/enums/roles';
import { ServiceTypes } from '../../../Services/shared/enums/service-types';
import { GlobalService } from '../../../Services/shared/global.service';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { SaveFavorite } from '../../../Services/shared/models/save-favorite';
import { UtilsService } from '../../../Services/shared/utils.service';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-service-payment',
  templateUrl: './service-payment.component.html',
  styleUrls: ['./service-payment.component.css'],
  providers: [ServicePaymentsService, UtilsService]
})
export class ServicePaymentComponent implements OnInit {

  isTokenFormDisabled = false;
  isVisibleToken = false;
  isTelephony = false;
  isClientCode = false;
  isPaymentSuccessful = false;
  excedeedAmount = false;
  isDisabledForm = false;
  processBatchNumber = 0;
  accountRequest: AccountDto;
  account: AccountResult;
  getDebtRequest: GetDebtRequest;
  creSaguapacDebt: CreSaguapacDebt;
  approversDto: InputApprovers;
  delapazDebt: DelapazDebt;
  paymentInformation: ServicePayment;
  successfulPaymentMessage = Constants.successfulTransferMessage;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private servicePayment: ServicePaymentsService, private messageService: GlobalService, private utilsService: UtilsService) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.account = new AccountResult();
    this.getDebtRequest = new GetDebtRequest();
    this.approversDto = new InputApprovers();
    this.accountRequest = new AccountDto();
    this.paymentInformation = new ServicePayment();
  }

  ngOnInit() {
    this.accountRequest = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoDeServicios],
      types: [String.fromCharCode(AccountTypes.passive)]
    });
    this.paymentInformation.operationTypeId = OperationType.pagoDeServicios;
    this.paymentInformation.amount = 0;
    this.paymentInformation.currency = Constants.currencyBol;
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.paymentInformation.amount = $event.amount;
    this.paymentInformation.fundSource = $event.fundSource;
    this.paymentInformation.fundDestination = $event.fundDestination;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversDto = new InputApprovers({
      operationTypeId: OperationType.pagoDeServicios,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.account = $event;
    this.paymentInformation.sourceAccountId = $event.id;
    this.paymentInformation.sourceAccount = $event.number;
  }

  handleTelephonyChanged($event: Telephony) {
    this.paymentInformation.telephonyPayment = $event;
    this.paymentInformation.telephonyPayment.serviceTypeId = this.getDebtRequest.service;
  }

  handleFutureDateChanged($event: DateFutureModel) {
    if ($event.isDateFuture) {
      this.paymentInformation.isScheduledProcess = $event.isDateFuture;
      this.paymentInformation.scheduledProcess = $event.date;
    }
  }

  handleServiceListChanged($event) {
    this.getDebtRequest.service = $event.value;
    this.isTelephony = $event.value === ServiceTypes.TelefoniaFija || $event.value === ServiceTypes.TelefoniaMovil;
    this.isClientCode = !this.isTelephony && this.getDebtRequest.service != null;
    this.restartDetailOfDebts();
  }

  handleOnNewSearch() {
    this.restartDetailOfDebts();
  }

  handleGetDebtChanged($event) {
    if (+this.getDebtRequest.service === ServiceTypes.Delapaz) {
      this.delapazDebt = $event;
    } else {
      this.creSaguapacDebt = $event;
    }
  }

  handleFavoritePaymentCheckChanged($event) {
    if (!$event) {
      this.restartDetailOfDebts();
    }
  }

  handleDebtDetailChanged($event) {
    if (+this.getDebtRequest.service === ServiceTypes.Delapaz) {
      this.paymentInformation.delapazPayment = $event;
      this.paymentInformation.amount = $event.amount;
    } else {
      this.paymentInformation.creSaguapacPayment = $event;
      this.paymentInformation.amount = Math.round(($event.reduce((sum, item) => sum + item.amount, 0)) * 1e12) / 1e12;
    }
  }

  handleApproversAndControllersChanged($event: ApproversAndControllers) {
    this.paymentInformation.approvers = $event.approvers;
    this.paymentInformation.controllers = $event.controllers;
    this.paymentInformation.cismartApprovers = $event.cismartApprovers;
  }

  handleSaveFavoriteChanged($event: SaveFavorite) {
    this.paymentInformation.isFavorite = $event.isFavorite;
    this.paymentInformation.favoriteName = $event.name;
  }

  handleEmailsChanged($event: EmailInputModel) {
    this.paymentInformation.sendVouchers = $event.emails;
  }

  restartDetailOfDebts() {
    this.paymentInformation.amount = 0;
    this.paymentInformation.creSaguapacPayment = undefined;
    this.paymentInformation.delapazPayment = undefined;
    this.creSaguapacDebt = undefined;
    this.delapazDebt = undefined;
  }

  handleSendBillChanged($event: SendBill) {
    this.paymentInformation.billAddress = $event;
  }

  handleValidate(currencyAndAmountValidation: boolean,
    telephonyValidation: boolean, clientCodeValidation: boolean,
    serviceListValidation: boolean, favoritesValidation: boolean,
    billValidation: boolean, approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && telephonyValidation && clientCodeValidation && serviceListValidation && favoritesValidation && billValidation && approversAndControllersValidation && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateAmount(this.account.currency, this.account.availableBalance, Constants.currencyBol, this.paymentInformation.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    }
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.paymentInformation.tokenCode = $event.code;
    this.paymentInformation.tokenName = $event.name;
    this.isTokenFormDisabled = true;
    this.servicePayment.savePayment(this.paymentInformation)
      .subscribe(response => {
        this.processBatchNumber = response.processBatchId;
        this.messageService.info('Operación realizada', this.successfulPaymentMessage + ' ' + this.processBatchNumber + '.', true);
        this.isPaymentSuccessful = this.isDisabledForm = true;
        this.isVisibleToken = this.isTokenFormDisabled = false;
      }, error => { this.messageService.danger('peración fallida', error); this.isTokenFormDisabled = false; });
  }

  showToken() {
    this.approversComponent.validationCismart()
      .subscribe(res => {
        if (res) {
          this.isVisibleToken = true;
        }
      });
  }
}
