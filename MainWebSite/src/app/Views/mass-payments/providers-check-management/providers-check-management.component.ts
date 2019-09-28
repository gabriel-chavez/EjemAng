import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import 'rxjs/add/operator/map';
import { AccountsService } from '../../../Services/accounts/accounts.service';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { Roles } from '../../../Services/shared/enums/roles';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { GlobalService } from '../../../Services/shared/global.service';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { UtilsService } from '../../../Services/shared/utils.service';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { DetailProvider } from '../../../Services/providersCheckManagement/models/detail-provider';
import { InformationProvidersCheckManagementResponseModel } from '../../../Services/providersCheckManagement/models/information-providers-check-management-response-model';
import { ProvidersCheckManagementBasicRequestModel } from '../../../Services/providersCheckManagement/models/providers-check-management-basic-request-model';
import { ProvidersCheckManagementService } from '../../../Services/providersCheckManagement/providers-check-management.service';
import { ProvidersCheckManagementSpreadsheetsRequest } from '../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-request';
import { ProvidersCheckManagementSpreadsheetsResponse } from '../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-response';
import { ProvidersCheckManagementPreviousFormResponse } from '../../../Services/providersCheckManagement/models/providers-check-management-previous-form-response';
import { ProvidersCheckManagementRequest } from '../../../Services/providersCheckManagement/models/providers-check-management-request';
import { ProvidersCheckManagementData } from '../../../Services/providersCheckManagement/models/providers-check-management-data';
import { ProvidersCheckManagementDetail } from '../../../Services/providersCheckManagement/models/providers-check-management-detail';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { Router } from '@angular/router';
import { RowListDetailsProvidersCheckManagementComponent } from '../components/row-list-details-providers-check-management/row-list-details-providers-check-management.component';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-providers-check-management',
  templateUrl: './providers-check-management.component.html',
  styleUrls: ['./providers-check-management.component.css'],
  providers: [AccountsService, ExchangeRatesService, TicketsService, UtilsService, ProvidersCheckManagementService]
})
export class ProvidersCheckManagementComponent implements OnInit {
  accountRequest: ProvidersCheckManagementRequest = new ProvidersCheckManagementRequest();
  approversRequest: InputApprovers = new InputApprovers();
  public val1 = false; public val2 = false; public val3 = false; public val4 = false; public val5 = false; public val6 = false; public val7 = false; public val8 = false; public val9 = false; public val0 = false; public val10 = false; public val11 = false;
  rows: InformationProvidersCheckManagementResponseModel;
  details: ProvidersCheckManagementSpreadsheetsResponse[] = [];
  detail: ProvidersCheckManagementDetail = new ProvidersCheckManagementDetail();
  DetailProvider: DetailProvider[] = [];
  ProcessBatchId: number;
  Line: number;
  Amount: number;
  SocialReason: string;
  NumberTransact: string;
  TypeDocument: string;
  Document: string;
  ExtensionDocument: string;
  AddressDelivery: string;
  Email: string;
  MessageProcess: string;
  UserBackoffice: string;
  DateProcessBackoffice: string;
  BeneficiaryReason: string;
  Instructions: string;
  PlaceDelivery: string;
  Detail: string;
  EmailProvider: string;
  sourceAccountDto: AccountDto = new AccountDto();
  isValid: boolean;
  isVisibleToken: boolean;
  typeDetailSelected: number;
  isRemoveModalVisible: boolean;
  amounttotal: number;
  processBatchNumber: number;
  ProvidersCheckManagementData: ProvidersCheckManagementData = new ProvidersCheckManagementData();
  previousForm: any;
  isPaymentSuccessful: boolean;
  isDisabled: boolean;
  verifyamount: boolean;
  response: ProvidersCheckManagementPreviousFormResponse;
  ticketRequest: TicketDto = new TicketDto();
  isCompVisible: boolean;
  msg: string;
  excedeedAmount = false;
  types: string[] = ['P'];
  isVisibleAuthandControllers: boolean;
  requestId: ProvidersCheckManagementSpreadsheetsRequest = new ProvidersCheckManagementSpreadsheetsRequest();
  sourceAccount: AccountResult;
  isDisabledFormAccount: boolean;
  totalItems = 9;
  sizePage = 9;
  isDisabledAfterSave: boolean;
  currentPage;
  numPag: number;
  isEdit = false;
  newFin = false;
  selectedLink: string;
  selectedItem: any;
  informationModel: InformationProvidersCheckManagementResponseModel;
  list: ProvidersCheckManagementBasicRequestModel[] = [];
  request: AccountDto = new AccountDto();
  @ViewChild(RowListDetailsProvidersCheckManagementComponent) RowListDetailsProvidersCheckManagementComponent: RowListDetailsProvidersCheckManagementComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private providersCheckManagementService: ProvidersCheckManagementService, private accountService: AccountsService, private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService) {
    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.accountRequest = {
      accountUse: 'D',
      roleId: 4,
      operationTypeId: OperationType.pagoProveedoresChequeGerencia,
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
    this.ProvidersCheckManagementData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoProveedoresChequeGerencia
    };
    this.request = {
      accountUse: 'D',
      operationTypeId: [26],
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
      Amount: 0,
      BeneficiaryReason: '',
      Instructions: '',
      PlaceDelivery: '',
      Detail: '',
      EmailProvider: ''
    };
  }

  handleObtainedTicket($event: TicketModel) {
    this.ProvidersCheckManagementData.preferentialExchange = $event.ticket.exchangeRate;
    this.ProvidersCheckManagementData.indicatorBuyOrSale = $event.ticket.operationType;
    this.ProvidersCheckManagementData.numberTicket = $event.ticket.ticket;
    this.ProvidersCheckManagementData.isTicket = $event.isTicketSelected;
  }


  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.ProvidersCheckManagementData.currency = $event.currency;
    this.ProvidersCheckManagementData.amount = $event.amount;
    if (this.ProvidersCheckManagementData.amount === 0 || this.ProvidersCheckManagementData.amount === undefined) {
      this.verifyamount = false;
    } else {
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.ProvidersCheckManagementData.fundDestination = $event.fundDestination;
    this.ProvidersCheckManagementData.fundSource = $event.fundSource;
  }
  handleSubmit() {
    this.showToken();
  }
  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean,sourceAccountValidation: boolean) {
      if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation
        && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.ProvidersCheckManagementData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.ProvidersCheckManagementData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }
  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance,
      this.ProvidersCheckManagementData.currency, +this.ProvidersCheckManagementData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  validateGMESATicket() {
    if (!this.ProvidersCheckManagementData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.ProvidersCheckManagementData.currency, this.ProvidersCheckManagementData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.ProvidersCheckManagementData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.ProvidersCheckManagementData.numberTicket,
        amount: this.ProvidersCheckManagementData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.ProvidersCheckManagementData.preferentialExchange = resp.exchangeRate;
          this.ProvidersCheckManagementData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.ProvidersCheckManagementData.tokenCode = $event.code;
    this.ProvidersCheckManagementData.tokenName = $event.name;
    this.savePayment();
  }
  savePayment() {
    this.providersCheckManagementService.save(this.ProvidersCheckManagementData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('Operación Fallida', error.message));
  }

  handleDateFuture($event: DateFutureModel) {
    this.ProvidersCheckManagementData.isScheduledProcess = $event.isDateFuture;
    this.ProvidersCheckManagementData.scheduledProcess = $event.date;
  }

  handleDescription($event: string) {
    this.ProvidersCheckManagementData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    if ($event.isEmailInputSelected) {
      this.ProvidersCheckManagementData.sendVouchers = $event.emails;
    } else {
      this.ProvidersCheckManagementData.sendVouchers = '';
    }
  }
  handleFirstVerify($event) {
    this.val0 = true;
    if (this.ProvidersCheckManagementData.currency === '') {
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de moneda');
      return;
    } else {
      if (this.ProvidersCheckManagementData.description === '') {
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
    this.providersCheckManagementService
      .getPreviousForm().subscribe((response: ProvidersCheckManagementPreviousFormResponse[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error));
  }

  handleFile($event: FormData) {
    this.providersCheckManagementService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.detail.detail.forEach(x => x.type = 'CA');
      this.typeDetailSelected = 3;
    });
  }

  handleActionRow($event: any) {
    this.ProvidersCheckManagementData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.ProvidersCheckManagementData.amount = $event.totalamount;
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.ProvidersCheckManagementData.amount = $event.totalamount;
      this.verifyamount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizo el monto actual es de : ${this.ProvidersCheckManagementData.amount}
      ${this.ProvidersCheckManagementData.currency}`;
    this.messageService.success('Actualizacion:', message);
    for (let i = 0; i < this.ProvidersCheckManagementData.speeadsheet.length; i++) {
      if (this.ProvidersCheckManagementData.speeadsheet[i].isEdit) {
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
    this.ProvidersCheckManagementData.approvers = $event.approvers;
    this.ProvidersCheckManagementData.controllers = $event.controllers;
    this.ProvidersCheckManagementData.cismartApprovers = $event.cismartApprovers;
  }

  setradio(e: string) {
    this.selectedLink = e;
    switch (e) {
      case 'optTic':
        this.val0 = false;
        break;
    }
  }

  handleListDetailPayments($event: DetailProvider[]) {
    this.DetailProvider = $event;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoProveedoresChequeGerencia,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.ProvidersCheckManagementData.sourceAccount = $event.number;
    this.ProvidersCheckManagementData.sourceAccountId = $event.id;
  }

  handleTokenOpen() {
    this.showToken();
  }

  getAmounts() {
    return this.ProvidersCheckManagementData.speeadsheet.map(x => +x.amount);
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
