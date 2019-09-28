import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { DetailPayment } from '../../../Services/taxPaymentCheck/models/detail-payment';
import 'rxjs/add/operator/map';
import { AccountsService } from '../../../Services/accounts/accounts.service';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { InformationPaymentTaxCheckResponseModel } from '../../../Services/taxPaymentCheck/models/information-payment-tax-check-response-model';
import { TaxPaymentCheckService } from '../../../Services/taxPaymentCheck/tax-payment-check.service';
import { PaymentTaxCheckBasicRequestModel } from '../../../Services/taxPaymentCheck/models/payment-tax-check-basic-request-model';
import { Roles } from '../../../Services/shared/enums/roles';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { PaymentTaxCheckData } from '../../../Services/taxPaymentCheck/models/payment-tax-check-data';
import { PaymentTaxCheckDetail } from '../../../Services/taxPaymentCheck/models/payment-tax-check-detail';
import { PaymentTaxCheckPreviousFormResponse } from '../../../Services/taxPaymentCheck/models/payment-tax-check-previous-form-response';
import { PaymentTaxCheckSpreadsheetsResponse } from '../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-response';
import { PaymentTaxCheckSpreadsheetsRequest } from '../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-request';
import { GlobalService } from '../../../Services/shared/global.service';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { Router } from '@angular/router';
import { PaymentTaxCheckRequest } from '../../../Services/taxPaymentCheck/models/payment-tax-check-request';
import { UtilsService } from '../../../Services/shared/utils.service';
import { RowListDetailPaymentsComponent } from '../components/list-detail-payments/row-list-detail-payments/row-list-detail-payments.component';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-tax-payment-check-management',
  templateUrl: './tax-payment-check-management.component.html',
  styleUrls: ['./tax-payment-check-management.component.css'],
  providers: [AccountsService, TaxPaymentCheckService, ExchangeRatesService, UtilsService, TicketsService]
})
export class TaxPaymentCheckManagementComponent implements OnInit {
  public val2 = false; public val3 = false; public val4 = false; public val5 = false; public val6 = false; public val7 = false; public val8 = false; public val9 = false; public val0 = false; public val10 = false; public val11 = false;
  rows: InformationPaymentTaxCheckResponseModel;
  details: PaymentTaxCheckSpreadsheetsResponse[] = [];
  detail: PaymentTaxCheckDetail = new PaymentTaxCheckDetail();
  detailPayment: DetailPayment[] = [];
  accountRequest: PaymentTaxCheckRequest = new PaymentTaxCheckRequest();
  approversRequest: InputApprovers = new InputApprovers();
  public ProcessBatchId: number;
  public Line: number;
  public Amount: number;
  public SocialReason: string;
  public NumberTransact: string;
  public TypeDocument: string;
  public Document: string;
  public ExtensionDocument: string;
  public AddressDelivery: string;
  public Email: string;
  public MessageProcess: string;
  public UserBackoffice: string;
  public DateProcessBackoffice: string;
  sourceAccountDto: AccountDto = new AccountDto();
  isVisibleToken: boolean;
  isRemoveModalVisible: boolean;
  processBatchNumber: number;
  isValid: boolean;
  typeDetailSelected: number;
  amounttotal: number;
  PaymentTaxCheckData: PaymentTaxCheckData = new PaymentTaxCheckData();
  isPaymentSuccessful: boolean;
  previousForm: any;
  isDisabled: boolean;
  verifyamount: boolean;
  isCompVisible: boolean;
  ticketRequest: TicketDto = new TicketDto();
  response: PaymentTaxCheckPreviousFormResponse;
  msg: string;
  excedeedAmount = false;
  types: string[] = ['P'];
  isVisibleAuthandControllers: boolean;
  requestId: PaymentTaxCheckSpreadsheetsRequest = new PaymentTaxCheckSpreadsheetsRequest();
  @ViewChild(RowListDetailPaymentsComponent) RowListDetailPaymentsComponent: RowListDetailPaymentsComponent;
  sourceAccount: AccountResult;
  isDisabledFormAccount: boolean;
  totalItems = 9;
  sizePage = 9;
  isDisabledAfterSave: boolean;
  public currentPage;
  public numPag: number;
  isEdit = false;
  newFin = false;
  private selectedLink: string;
  selectedItem: any;
  informationModel: InformationPaymentTaxCheckResponseModel;
  list: PaymentTaxCheckBasicRequestModel[] = [];
  request: AccountDto = new AccountDto();
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private taxPaymentCheckService: TaxPaymentCheckService, private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService) {
    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.accountRequest = {
      accountUse: 'D',
      roleId: 4,
      operationTypeId: OperationType.pagoImpuestoGerencia,
      types: ['P']
    };
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.isDisabled = false;
    this.verifyamount = false;
    this.amounttotal = 0;
    this.isVisibleToken = false;
    this.processBatchNumber = 0;
    this.isRemoveModalVisible = false;
    this.isPaymentSuccessful = false;
    this.isCompVisible = false;
    this.isVisibleAuthandControllers = false;
  }

  ngOnInit() {
    this.PaymentTaxCheckData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoImpuestoGerencia
    };
    this.request = {
      accountUse: 'D',
      operationTypeId: [28],
      roleId: Roles.authorizer,
      types: ['P']
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoHaberes],
      types: this.types
    });

    this.informationModel = {
      Line: 1,
      Amount: 0,
      SocialReason: '',
      NumberTransact: '',
      TypeDocument: '',
      Document: '',
      ExtensionDocument: '',
      AddressDelivery: '',
      Email: ''
    };
  }

  handleObtainedTicket($event: TicketModel) {
    this.PaymentTaxCheckData.preferentialExchange = $event.ticket.exchangeRate;
    this.PaymentTaxCheckData.indicatorBuyOrSale = $event.ticket.operationType;
    this.PaymentTaxCheckData.numberTicket = $event.ticket.ticket;
    this.PaymentTaxCheckData.isTicket = $event.isTicketSelected;
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.PaymentTaxCheckData.currency = $event.currency;
    this.PaymentTaxCheckData.amount = $event.amount;
    if (this.PaymentTaxCheckData.amount === 0 || this.PaymentTaxCheckData.amount === undefined) {
      this.verifyamount = false;
    } else {
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.PaymentTaxCheckData.fundDestination = $event.fundDestination;
    this.PaymentTaxCheckData.fundSource = $event.fundSource;
  }

  handleSubmit() {
    this.showToken();
  }

  handleValidate(currencyAndAmountValidation: boolean,
    ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && ticketValidation && approversAndControllersValidation
      && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.PaymentTaxCheckData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.PaymentTaxCheckData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance,
      this.PaymentTaxCheckData.currency, +this.PaymentTaxCheckData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }

  validateGMESATicket() {
    if (!this.PaymentTaxCheckData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance,
        this.PaymentTaxCheckData.currency, +this.PaymentTaxCheckData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.PaymentTaxCheckData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.PaymentTaxCheckData.numberTicket,
        amount: this.PaymentTaxCheckData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.PaymentTaxCheckData.preferentialExchange = resp.exchangeRate;
          this.PaymentTaxCheckData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.PaymentTaxCheckData.tokenCode = $event.code;
    this.PaymentTaxCheckData.tokenName = $event.name;
    this.savePayment();
  }

  savePayment() {
    this.taxPaymentCheckService.save(this.PaymentTaxCheckData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('Transacción fallida', error.message));
  }

  handleDateFuture($event: DateFutureModel) {
    this.PaymentTaxCheckData.isScheduledProcess = $event.isDateFuture;
    this.PaymentTaxCheckData.scheduledProcess = $event.date;
  }

  handleDescription($event: string) {
    this.PaymentTaxCheckData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    if ($event.isEmailInputSelected) {
      this.PaymentTaxCheckData.sendVouchers = $event.emails;
    } else {
      this.PaymentTaxCheckData.sendVouchers = '';
    }
  }

  handleFirstVerify($event) {
    this.val0 = true;
    if (this.PaymentTaxCheckData.currency === '') {
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de moneda');
      return;
    } else {
      if (this.PaymentTaxCheckData.description === '') {
        this.messageService.warning('Error de validación:', 'Debe introducir una descripción');
        return;
      } else {
        this.isDisabled = true;
        this.isDisabledFormAccount = true;
        this.isValid = true;
      }
    }
  }

  getPreviousForm() {
    this.taxPaymentCheckService
      .getPreviousForm().subscribe((response: PaymentTaxCheckPreviousFormResponse[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error));
  }
  handleFile($event: FormData) {
    this.taxPaymentCheckService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;
    });
  }

  handleActionRow($event: any) {
    this.PaymentTaxCheckData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.PaymentTaxCheckData.amount = $event.totalamount;
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.PaymentTaxCheckData.amount = $event.totalamount;
      this.verifyamount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizo el monto actual es de : ${this.PaymentTaxCheckData.amount}
      ${this.PaymentTaxCheckData.currency}`;
    this.messageService.success('Actualizacion:', message);
    for (let i = 0; i < this.PaymentTaxCheckData.speeadsheet.length; i++) {
      if (this.PaymentTaxCheckData.speeadsheet[i].isEdit) {
        this.messageService.warning('Advertencia', 'No podra finalizar este proceso, hasta que todos los registros esten correctamente llenados');
        this.verifyamount = false;
      }
    }
  }

  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }
  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.PaymentTaxCheckData.approvers = $event.approvers;
    this.PaymentTaxCheckData.controllers = $event.controllers;
    this.PaymentTaxCheckData.cismartApprovers = $event.cismartApprovers;
  }

  setradio(e: string) {
    this.selectedLink = e;
    switch (e) {
      case 'optTic':
        this.val0 = false;
        break;
    }
  }

  handleListDetailPayments($event: DetailPayment[]) {
    this.detailPayment = $event;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoImpuestoGerencia,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.PaymentTaxCheckData.sourceAccount = $event.number;
    this.PaymentTaxCheckData.sourceAccountId = $event.id;
  }

  handleTokenOpen() {
    this.showToken();
  }

  getAmounts() {
    return this.PaymentTaxCheckData.speeadsheet.map(x => +x.amount);
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
