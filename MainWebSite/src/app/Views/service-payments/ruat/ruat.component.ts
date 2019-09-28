import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { RuatPayment } from '../../../Services/ruat/models/ruat-payment';
import { ServicePaymentsService } from '../../../Services/service-payments/service-payments.service';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Constants } from '../../../Services/shared/enums/constants';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { Roles } from '../../../Services/shared/enums/roles';
import { GlobalService } from '../../../Services/shared/global.service';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { UtilsService } from '../../../Services/shared/utils.service';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-ruat',
  templateUrl: './ruat.component.html',
  styleUrls: ['./ruat.component.css'],
  providers: [UtilsService, ServicePaymentsService]
})
export class RuatComponent implements OnInit {

  accountDto: AccountDto;
  approversDto: InputApprovers;
  account: AccountResult;
  isVisibleToken = false;
  isPaymentSuccessful = false;
  excedeedAmount = false;
  isDisabledForm = false;
  isTokenFormDisabled = false;
  processBatchNumber = 0;
  successfulPaymentMessage = Constants.successfulTransferMessage;
  paymentInformation: RuatPayment;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private utilsService: UtilsService, private messageService: GlobalService, private servicePaymentService: ServicePaymentsService) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.paymentInformation = new RuatPayment();
  }

  ngOnInit() {
    this.accountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoDeServicios],
      types: [String.fromCharCode(AccountTypes.passive)]
    });
    this.paymentInformation.operationTypeId = OperationType.pagoDeServicios;
    this.paymentInformation.currency = Constants.currencyBol;
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.paymentInformation.fundSource = $event.fundSource;
    this.paymentInformation.fundDestination = $event.fundDestination;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversDto = new InputApprovers({
      operationTypeId: OperationType.transferenciasCuentasPropias,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.account = $event;
    this.paymentInformation.sourceAccountId = $event.id;
    this.paymentInformation.sourceAccount = $event.number;
  }

  handleApproversAndControllersChanged($event: ApproversAndControllers) {
    this.paymentInformation.approvers = $event.approvers;
    this.paymentInformation.controllers = $event.controllers;
    this.paymentInformation.cismartApprovers = $event.cismartApprovers;
  }

  handleEmailsChanged($event: EmailInputModel) {
    this.paymentInformation.sendVouchers = $event.emails;
  }

  handleServiceListChanged($event) {
    this.paymentInformation.service = $event.value;
  }

  handleDebtDetailChanged($event: any) {
    this.paymentInformation.amount = Math.round(($event.debtDetails.reduce((sum, item) => sum + item.amount, 0)) * 1e12) / 1e12;
    this.paymentInformation.payment = $event;
    this.paymentInformation.payment.serviceTypeInformation.amount = this.paymentInformation.amount;
  }

  handleValidate(currencyAndAmountValidation: boolean,
    serviceListValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && serviceListValidation && approversAndControllersValidation && approversLimitValidation && sourceAccountValidation) {
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
    this.servicePaymentService.saveRuatPayment(this.paymentInformation)
      .subscribe((response: any) => {
        this.processBatchNumber = response.processBatchId;
        this.messageService.info('Operación realizada', this.successfulPaymentMessage + ' ' + this.processBatchNumber + '.', true);
        this.isDisabledForm = this.isPaymentSuccessful = true;
        this.isVisibleToken = this.isTokenFormDisabled = false;
      }, error => {
        this.messageService.danger('Operación fallida', error);
        this.isTokenFormDisabled = false;
      });
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
