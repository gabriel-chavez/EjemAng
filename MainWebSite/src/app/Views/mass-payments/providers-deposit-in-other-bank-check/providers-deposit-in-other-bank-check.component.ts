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
import { InformationProvidersDepositInOtherBankCheckResult } from '../../../Services/providersDepositInOtherBankCheck/models/information-providers-deposit-in-other-bank-check-result';
import { ProvidersDepositInOtherBankCheckResult } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-result';
import { ProvidersDepositInOtherBankCheckDto } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-dto';
import { ProvidersDepositInOtherBankCheckData } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-data';
import { ProvidersDepositInOtherBankCheckDetail } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-detail';
import { ProvidersDepositInOtherBankCheckService } from '../../../Services/providersDepositInOtherBankCheck/providers-deposit-in-other-bank-check.service';
import { ProvidersDepositInOtherBankCheckSpreadsheetsDto } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-dto';
import { ProvidersDepositInOtherBankCheckPreviousFormResult } from '../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-previous-form-result';
import { DetailProvidersOtherBank } from '../../../Services/providersDepositInOtherBankCheck/models/detail-providers-other-bank';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { Router, NavigationEnd } from '@angular/router';
import { RowListDetailsProvidersDepositInOtherBankCheckComponent } from '../components/row-list-details-providers-deposit-in-other-bank-check/row-list-details-providers-deposit-in-other-bank-check.component';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-providers-deposit-in-other-bank-check',
  templateUrl: './providers-deposit-in-other-bank-check.component.html',
  styleUrls: ['./providers-deposit-in-other-bank-check.component.css'],
  providers: [AccountsService, ExchangeRatesService, TicketsService, UtilsService, ProvidersDepositInOtherBankCheckService]
})
export class ProvidersDepositInOtherBankCheckComponent implements OnInit {
  accountRequest: ProvidersDepositInOtherBankCheckDto = new ProvidersDepositInOtherBankCheckDto();
  approversRequest: InputApprovers = new InputApprovers();
  public val0 = false;
  rows: InformationProvidersDepositInOtherBankCheckResult;
  detail: ProvidersDepositInOtherBankCheckDetail = new ProvidersDepositInOtherBankCheckDetail();
  DetailProvidersOtherBank: DetailProvidersOtherBank[] = [];
  public ProcessBatchId: number;
  public Line: number;
  public DestinationAccount: string;
  public Amount: number;
  public SocialReason: string;
  public NumberTransact: string;
  public TypeDocument: string;
  public Document: string;
  public ExtensionDocument: string;
  public AddressDelivery: string;
  public Email: string;
  public MessageProcess: string;
  public Bank: string;
  public UserBackoffice: string;
  public DateProcessBackoffice: string;
  public BeneficiaryReason: string;
  public Instructions: string;
  public PlaceDelivery: string;
  public Detail: string;
  public EmailProvider: string;
  excedeedAmount = false;
  sourceAccountDto: AccountDto = new AccountDto();
  isValid: boolean;
  isVisibleToken: boolean;
  typeDetailSelected: number;
  isRemoveModalVisible: boolean;
  amounttotal: number;
  processBatchNumber: number;
  ProvidersDepositInOtherBankCheckData: ProvidersDepositInOtherBankCheckData = new ProvidersDepositInOtherBankCheckData();
  isPaymentSuccessful: boolean;
  isDisabled: boolean;
  verifyamount: boolean;
  msg: string;
  types: string[] = ['P'];
  response: ProvidersDepositInOtherBankCheckPreviousFormResult;
  ticketRequest: TicketDto = new TicketDto();
  previousForm: any;
  isCompVisible: boolean;
  isVisibleAuthandControllers: boolean;
  requestId: ProvidersDepositInOtherBankCheckSpreadsheetsDto = new ProvidersDepositInOtherBankCheckSpreadsheetsDto();
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
  informationModel: ProvidersDepositInOtherBankCheckResult;
  list: ProvidersDepositInOtherBankCheckDto[] = [];
  request: AccountDto = new AccountDto();
  @ViewChild(RowListDetailsProvidersDepositInOtherBankCheckComponent) rowDetailsComponent: RowListDetailsProvidersDepositInOtherBankCheckComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private ProvidersDepositInOtherBankCheckService: ProvidersDepositInOtherBankCheckService,
    private accountService: AccountsService, private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService) {
    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.accountRequest = {
      accountUse: 'D',
      roleId: 4,
      operationTypeId: OperationType.pagoProveedoresOtrosBancosCheque,
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
    this.ProvidersDepositInOtherBankCheckData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoProveedoresOtrosBancosCheque
    };
    this.request = {
      accountUse: 'D',
      operationTypeId: [27],
      roleId: Roles.authorizer,
      types: ['P']
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoProveedoresOtrosBancosCheque],
      types: this.types
    });

    this.informationModel = {
      DestinationAccount: '',
      Amount: 0,
      BeneficiaryReason: '',
      Instructions: '',
      Detail: '',
      Bank: '',
      EmailProvider: ''
    };
  }

  handleObtainedTicket($event: TicketModel) {
    this.ProvidersDepositInOtherBankCheckData.preferentialExchange = $event.ticket.exchangeRate;
    this.ProvidersDepositInOtherBankCheckData.indicatorBuyOrSale = $event.ticket.operationType;
    this.ProvidersDepositInOtherBankCheckData.numberTicket = $event.ticket.ticket;
    this.ProvidersDepositInOtherBankCheckData.isTicket = $event.isTicketSelected;
  }


  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.ProvidersDepositInOtherBankCheckData.currency = $event.currency;
    this.ProvidersDepositInOtherBankCheckData.amount = $event.amount;
    if (this.ProvidersDepositInOtherBankCheckData.amount === 0 || this.ProvidersDepositInOtherBankCheckData.amount === undefined) {
      this.verifyamount = false;
    } else {
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.ProvidersDepositInOtherBankCheckData.fundDestination = $event.fundDestination;
    this.ProvidersDepositInOtherBankCheckData.fundSource = $event.fundSource;
  }

  handleSubmit() {
    this.showToken();
  }

  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation
      && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.ProvidersDepositInOtherBankCheckData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.ProvidersDepositInOtherBankCheckData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }
  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance,
      this.ProvidersDepositInOtherBankCheckData.currency, +this.ProvidersDepositInOtherBankCheckData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  validateGMESATicket() {
    if (!this.ProvidersDepositInOtherBankCheckData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance,
        this.ProvidersDepositInOtherBankCheckData.currency, +this.ProvidersDepositInOtherBankCheckData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.ProvidersDepositInOtherBankCheckData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.ProvidersDepositInOtherBankCheckData.numberTicket,
        amount: this.ProvidersDepositInOtherBankCheckData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.ProvidersDepositInOtherBankCheckData.preferentialExchange = resp.exchangeRate;
          this.ProvidersDepositInOtherBankCheckData.indicatorBuyOrSale = resp.operationType;
          this.validateAmounts();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.ProvidersDepositInOtherBankCheckData.tokenCode = $event.code;
    this.ProvidersDepositInOtherBankCheckData.tokenName = $event.name;
    this.savePayment();
  }

  savePayment() {
    this.ProvidersDepositInOtherBankCheckService.save(this.ProvidersDepositInOtherBankCheckData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('Operación Fallida', error.message));
  }

  handleDateFuture($event: DateFutureModel) {
    this.ProvidersDepositInOtherBankCheckData.isScheduledProcess = $event.isDateFuture;
    this.ProvidersDepositInOtherBankCheckData.scheduledProcess = $event.date;
  }

  handleDescription($event: string) {
    this.ProvidersDepositInOtherBankCheckData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    if ($event.isEmailInputSelected) {
      this.ProvidersDepositInOtherBankCheckData.sendVouchers = $event.emails;
    } else {
      this.ProvidersDepositInOtherBankCheckData.sendVouchers = '';
    }
  }
  handleFirstVerify($event) {
    this.val0 = true;
    if (this.ProvidersDepositInOtherBankCheckData.currency === '') {
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de moneda');
      return;
    } else {
      if (this.ProvidersDepositInOtherBankCheckData.description === '') {
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
    this.ProvidersDepositInOtherBankCheckService
      .getPreviousForm().subscribe((response: ProvidersDepositInOtherBankCheckPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error));
  }
  handleFile($event: FormData) {
    this.ProvidersDepositInOtherBankCheckService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.detail.detail.forEach(x => x.type = 'CA');
      this.typeDetailSelected = 3;
    });
  }

  handleActionRow($event: any) {
    this.ProvidersDepositInOtherBankCheckData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.ProvidersDepositInOtherBankCheckData.amount = $event.totalamount;
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.ProvidersDepositInOtherBankCheckData.amount = $event.totalamount;
      this.verifyamount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizo, el monto actual es de : ${this.ProvidersDepositInOtherBankCheckData.amount}
    ${this.ProvidersDepositInOtherBankCheckData.currency}`;
    this.messageService.success('Actualizacion:', message);
    if (this.ProvidersDepositInOtherBankCheckData.speeadsheet.find(x => x.isEdit)) {
      this.messageService.warning('Advertencia', 'No podra finalizar este proceso, hasta que todos los registros esten correctamente llenados');
      this.verifyamount = false;
    }
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }


  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.ProvidersDepositInOtherBankCheckData.approvers = $event.approvers;
    this.ProvidersDepositInOtherBankCheckData.controllers = $event.controllers;
    this.ProvidersDepositInOtherBankCheckData.cismartApprovers = $event.cismartApprovers;
  }

  setradio(e: string) {
    this.selectedLink = e;
    switch (e) {
      case 'optTic':
        this.val0 = false;
        break;
    }
  }

  handleListDetailPayments($event: DetailProvidersOtherBank[]) {
    this.DetailProvidersOtherBank = $event;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoProveedoresOtrosBancosCheque,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.ProvidersDepositInOtherBankCheckData.sourceAccount = $event.number;
    this.ProvidersDepositInOtherBankCheckData.sourceAccountId = $event.id;
  }

  handleTokenOpen() {
    this.showToken();
  }

  getAmounts() {
    return this.ProvidersDepositInOtherBankCheckData.speeadsheet.map(x => +x.amount);
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
