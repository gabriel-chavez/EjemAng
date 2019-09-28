import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { Router, NavigationEnd } from '@angular/router';
import { UtilsService } from '../../../Services/shared/utils.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { AfpService } from '../../../Services/AFP/afp.service';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { AFPPayment } from '../../../Services/AFP/Models/PaymentAFP';
import { Constants } from '../../../Services/shared/enums/constants';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { ResponseModelsAfpquery } from '../../../Services/AFP/Models/response-models-afpquery';
import { PaymentAFP } from '../../../Services/AFP/Models/response-models-afpquery';
import { DetailAFPDto } from '../../../Services/AFP/Models/response-models-afpquery';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-afp',
  templateUrl: './afp.component.html',
  styleUrls: ['./afp.component.css'],
  providers: [UtilsService, AfpService]
})
export class AfpComponent implements OnInit {
  accountDto: AccountDto;
  account: AccountResult;
  processBatchNumber: Number;
  approversDto: InputApprovers;
  disabled: boolean;
  isDisabledForm = false;
  paymentInformation: AFPPayment = new AFPPayment();
  excedeedAmount = false;
  isVisibleToken = false;
  isVisible = false;
  Totalaccount: number;
  isPaymentSuccessful = false;
  isTokenFormDisabled = false;
  successfulPaymentMessage = Constants.successfulTransferMessage;
  ResponseModelsAfp: ResponseModelsAfpquery = new ResponseModelsAfpquery();
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private utilsService: UtilsService, private messageService: GlobalService,
    private serviceAFP: AfpService) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {

    this.accountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoDeServicios],
      types: [String.fromCharCode(AccountTypes.passive)],
      currencies: ['BOL']
    });

    this.paymentInformation.operationTypeId = OperationType.pagoDeServicios;
    this.paymentInformation.currency = Constants.currencyBol;

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

  handleApproversAndControllersChanged($event: ApproversAndControllers) {
    this.paymentInformation.approvers = $event.approvers;
    this.paymentInformation.controllers = $event.controllers;
    this.paymentInformation.cismartApprovers = $event.cismartApprovers;
  }
  handleEmailsChanged($event: EmailInputModel) {
    this.paymentInformation.sendVouchers = $event.emails;
  }
  handleDebtDetailChanged($event) {
    this.ResponseModelsAfp = new ResponseModelsAfpquery();
    this.ResponseModelsAfp.codeAnswer = $event.codeAnswer;
    this.ResponseModelsAfp.codeauthorization = $event.codeauthorization;
    this.ResponseModelsAfp.detailAnswer = $event.detailAnswer;
    this.ResponseModelsAfp.detail = new PaymentAFP();
    this.ResponseModelsAfp.detail.amountTotal = $event.detail.amountTotal;

    this.ResponseModelsAfp.detail.detailDpaymentAFP[0] = new DetailAFPDto();
    this.ResponseModelsAfp.detail.detailDpaymentAFP[0].expirationDate = $event.detail.payments[0].expirationDate;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[0].accountNumberAFP = $event.detail.payments[0].accountNumberAFP;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[0].amounts = $event.detail.payments[0].amounts;

    this.ResponseModelsAfp.detail.detailDpaymentAFP[1] = new DetailAFPDto();
    this.ResponseModelsAfp.detail.detailDpaymentAFP[1].expirationDate = $event.detail.payments[1].expirationDate;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[1].accountNumberAFP = $event.detail.payments[1].accountNumberAFP;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[1].amounts = $event.detail.payments[1].amounts;

    this.ResponseModelsAfp.detail.detailDpaymentAFP[2] = new DetailAFPDto();
    this.ResponseModelsAfp.detail.detailDpaymentAFP[2].expirationDate = $event.detail.payments[2].expirationDate;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[2].accountNumberAFP = $event.detail.payments[2].accountNumberAFP;
    this.ResponseModelsAfp.detail.detailDpaymentAFP[2].amounts = $event.detail.payments[2].amounts;

    this.isVisible = true;
    this.Totalaccount = $event.detail.amountTotal;
    this.paymentInformation.amount = this.Totalaccount;
    this.paymentInformation.serviceInformation = $event.detail;
    this.paymentInformation.serviceInformation.periodAFP = $event.detail.payments[0].expirationDate;
    this.paymentInformation.serviceInformation.deatilAFPsDto = $event.detail.payments;

  }
  handleTokenSubmit($event: TokenCredentials) {
    this.paymentInformation.tokenCode = $event.code;
    this.paymentInformation.tokenName = $event.name;
    this.isTokenFormDisabled = true;

    this.serviceAFP.SavePaymentAFP(this.paymentInformation)
      .subscribe(response => {
        this.processBatchNumber = response.processBatchId;
        this.messageService.info('Operación realizada', this.successfulPaymentMessage + ' ' + this.processBatchNumber + '.', true);
        this.isPaymentSuccessful = this.isDisabledForm = true;
        this.isVisibleToken = this.isTokenFormDisabled = false;
      }, error => {
        this.messageService.danger('Operación fallida', error);
        this.isTokenFormDisabled = false;
      });

  }
  handleValidate(
    sourceAccountValidation: boolean,
    currencyAndAmountValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean) {
    if (sourceAccountValidation && currencyAndAmountValidation && approversAndControllersValidation && approversLimitValidation) {
      if (this.utilsService.validateAmount(this.account.currency, this.account.availableBalance, Constants.currencyBol, this.Totalaccount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    }
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
