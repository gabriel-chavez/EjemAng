import { Roles } from '../../../Services/shared/enums/roles';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PaymentOddAchService } from '../../../Services/mass-payments/payment-odd-ach.service';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { PaymentOddAchData } from '../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-data';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Services/shared/global.service';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { PaymentOddAchDetail } from '../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-detail';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-payment-debit-orders-ach',
  templateUrl: './payment-debit-orders-ach.component.html',
  styleUrls: ['./payment-debit-orders-ach.component.css'],
  providers: [PaymentOddAchService, ExchangeRatesService, UtilsService, TicketsService]
})
export class PaymentDebitOrdersAchComponent implements OnInit {
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  approversRequest: InputApprovers = new InputApprovers();
  isValid: boolean;
  isVisible: number;
  typeDetailSelected: number;
  response: MassivePaymentsPreviousFormResult;
  paymentOddAchData: PaymentOddAchData = new PaymentOddAchData();
  previousForm: any;
  sourceAccountDto: AccountDto = new AccountDto();
  ticketRequest: TicketDto = new TicketDto();
  isDisabled: boolean;
  verifyamount: boolean;
  amounttotal: number;
  isVisibleToken: boolean;
  processBatchNumber: number;
  isRemoveModalVisible: boolean;
  isPaymentSuccessful: boolean;
  isCompVisible: boolean;
  sourceAccount: AccountResult;
  saleExchangeRate: number;
  excedeedAmount = false;
  types: string[] = ['P'];
  isVisibleAuthandControllers: boolean;
  glossDeposit: string;
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  detail: PaymentOddAchDetail = new PaymentOddAchDetail();
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private paymentOddAchService: PaymentOddAchService,
    private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService,
    private cdRef: ChangeDetectorRef) {

    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.isDisabled = false;
    this.verifyamount = false;
    this.amounttotal = 0;
    this.isVisibleToken = false;
    this.processBatchNumber = 0;
    this.isRemoveModalVisible = false;
    this.isPaymentSuccessful = false;
    this.isCompVisible = false;
    this.paymentOddAchData.amount = 0;
    this.isVisibleAuthandControllers = false;
    this.glossDeposit = '';

    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.paymentOddAchData.description = '';
    this.paymentOddAchData.glossDeposit = '';
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.ordenesDeDebitoAOtrosBancos],
      types: this.types
    });
    this.isDisabledAfterSave = false;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  handleFile($event: FormData) {
    this.paymentOddAchService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;

    }, (error) => this.messageService.warning('No se pudo cargar el archivo: ', error));
  }
  handleObtainedTicket($event: TicketModel) {
    this.paymentOddAchData.preferentialExchange = $event.ticket.exchangeRate;
    this.paymentOddAchData.indicatorBuyOrSale = $event.ticket.operationType;
    this.paymentOddAchData.numberTicket = $event.ticket.ticket;
    this.paymentOddAchData.isTicket = $event.isTicketSelected;
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.paymentOddAchData.currency = $event.currency;
    this.paymentOddAchData.fundDestination = $event.fundDestination;
    this.paymentOddAchData.fundSource = $event.fundSource;
  }

  handleDateFuture($event: DateFutureModel) {
    this.paymentOddAchData.isScheduledProcess = $event.isDateFuture;
    this.paymentOddAchData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    // this.paymentOddAchData.isMultipleDebits = $event.isMultipleDebit;
    this.paymentOddAchData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.paymentOddAchData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    this.paymentOddAchData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleFirstVerify($event) {
    if (!this.paymentOddAchData.currency) {
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de moneda');
      return;
    } else {
      if (this.paymentOddAchData.description === '') {
        this.messageService.warning('Error de validación:', 'Debe introducir una descripcion');
        return;
      } else {
        if (this.paymentOddAchData.glossDeposit === '') {
          this.messageService.warning('Error de validación:', 'Debe introducir una glosa');
          return;
        } else {
          if (this.paymentOddAchData.isScheduledProcess) {
            if (this.paymentOddAchData.scheduledProcess == null) {
              this.messageService.warning('Error de validación:', 'Eligio opcion Fecha Futura, debe indicar una fecha.');
              return;
            }
          } else {
            this.isDisabled = true;
            this.isDisabledFormAccount = true;
            this.isValid = true;
          }

        }
      }
    }
  }
  getPreviousForm() {
    this.paymentOddAchService
      .getPreviousForm().subscribe((response: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.warning('', error));
  }

  handleActionRow($event: PaymentOddAchDetail) {
    this.paymentOddAchData.spreadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.paymentOddAchData.amount = $event.totalamount;
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.verifyamount = false;
      this.isVisibleAuthandControllers = false;
    }
    this.paymentOddAchData.amount = $event.totalamount;
    const message = `Se actualizo el monto actual es de : ${this.paymentOddAchData.amount}
    ${this.paymentOddAchData.currency}`;
    this.messageService.success('Actualizacion:', message);
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoProveedoresAch,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.paymentOddAchData.sourceAccount = $event.number;
    this.paymentOddAchData.sourceAccountId = $event.id;
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.paymentOddAchData.approvers = $event.approvers;
    this.paymentOddAchData.controllers = $event.controllers;
    this.paymentOddAchData.cismartApprovers = $event.cismartApprovers;
  }
  handleSubmit() {
    this.showToken();
  }
  handleTokenSubmit($event: TokenCredentials) {
    if ($event) {
      this.paymentOddAchData.tokenCode = $event.code;
      this.paymentOddAchData.tokenName = $event.name;
      this.isVisibleToken = false;
      this.savePayment();
    }
  }

  savePayment() {
    this.paymentOddAchService.save(this.paymentOddAchData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('Falla operacion save.', error.message));
  }
  reload() {
    window.location.reload(true);
  }
// && sourceAccountValidation
  handleValidate(currencyAndAmountValidation: boolean, futureDateValidation: boolean,
    approversAndControllersValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && approversAndControllersValidation && sourceAccountValidation ) {
      if (this.utilsService.validateRows(this.paymentOddAchData.spreadsheet)) {
        return this.messageService.warning('Planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.paymentOddAchData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.paymentOddAchData.currency, this.paymentOddAchData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  handleGlosa($event: string) {
    this.paymentOddAchData.glossDeposit = $event;
  }

  validateGMESATicket() {
    if (!this.paymentOddAchData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.paymentOddAchData.currency, this.paymentOddAchData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.paymentOddAchData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.paymentOddAchData.numberTicket,
        amount: this.paymentOddAchData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.paymentOddAchData.preferentialExchange = resp.exchangeRate;
          this.paymentOddAchData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Falla servicio payment ach odd', error.message));
    }
  }

  getAmounts() {
    return this.paymentOddAchData.spreadsheet.map(x => +x.amount);
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
