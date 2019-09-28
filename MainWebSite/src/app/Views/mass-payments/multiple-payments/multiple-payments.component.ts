import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { GlobalService } from '../../../Services/shared/global.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { MultiplePaymentsData } from '../../../Services/mass-payments/Models/multiple-payments/multiple-payments-data';
import { FormPaymentsOfAssetsComponent } from '../components/multiple-payments-forms/form-payments-of-assets/form-payments-of-assets.component';
import { ListOfPaymentsSchedulesComponent } from '../components/list-of-payments-schedules/list-of-payments-schedules.component';
import { FormProvidersPaymentsComponent } from '../components/multiple-payments-forms/form-providers-payments/form-providers-payments.component';
import { FormCashPaymentsComponent } from '../components/multiple-payments-forms/form-cash-payments/form-cash-payments.component';
import { FormAchpaymentsComponent } from '../components/multiple-payments-forms/form-achpayments/form-achpayments.component';
import { MultiplePaymentsService } from '../../../Services/mass-payments/multiple-payments-service.service';
import { Roles } from '../../../Services/shared/enums/roles';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { UtilsService } from '../../../Services/shared/utils.service';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { Router, NavigationEnd } from '@angular/router';
import { MultiplePaymentsGetPreviousForm } from '../../../Services/mass-payments/Models/multiple-payments/multiple-payments-get-previous-form';
import { Constants } from '../../../Services/shared/enums/constants';
import { MultiplePaymentDetail } from '../../../Services/mass-payments/Models/multiple-payments/multiple-payment-detail';
import { MultiplePaymentSpreadsheetsResult } from '../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-multiple-payments',
  templateUrl: './multiple-payments.component.html',
  styleUrls: ['./multiple-payments.component.css'],
  providers: [TicketsService, MultiplePaymentsService, UtilsService],
})
export class MultiplePaymentsComponent implements OnInit {
  sourceAccountDto: AccountDto = new AccountDto();
  approversRequest: InputApprovers = new InputApprovers();
  ticketRequest: TicketDto = new TicketDto();
  data: CurrencyAndAmount = new CurrencyAndAmount();
  multiplePaymentData: MultiplePaymentsData = new MultiplePaymentsData();
  requestId: MultiplePaymentsGetPreviousForm = new MultiplePaymentsGetPreviousForm();
  isVisibleButton: boolean;
  isVisibleList: number;
  containsData: boolean;
  amountAssetPayment: number;
  amountProviderPayment: number;
  amountCashPayment: number;
  amountACHPayment: number;
  amountTotal: number;
  paymentTypeHAB: string;
  paymentTypePROV: string;
  paymentTypeEFE: string;
  paymentTypeACH: string;
  isValidHAB: boolean;
  isValidPROV: boolean;
  isValidEFE: boolean;
  isValidACH: boolean;
  verifyAmount: boolean;
  isPaymentSuccessful: boolean;
  isVisibleToken: boolean;
  processBatchNumber: number;
  isRemoveModalVisible: boolean;
  isDisabledAfterSave: boolean;
  previousForm: any;
  isVisible: boolean;
  isVisibleButtonNew: boolean;
  types: string[] = ['P'];
  saleExchangeRate: number;
  isVisibleAuthandControllers: boolean;
  sourceAccount: AccountResult;
  excedeedAmount = false;
  isVisibleComponentFile = false;
  detailSalaries: MultiplePaymentDetail = new MultiplePaymentDetail;
  detailProviders: MultiplePaymentDetail = new MultiplePaymentDetail;
  detailCash: MultiplePaymentDetail = new MultiplePaymentDetail;
  detailAch: MultiplePaymentDetail = new MultiplePaymentDetail;
  @ViewChild(ListOfPaymentsSchedulesComponent) List: ListOfPaymentsSchedulesComponent = new ListOfPaymentsSchedulesComponent();
  @ViewChild(FormPaymentsOfAssetsComponent) RowAssetPayment: FormPaymentsOfAssetsComponent;
  @ViewChild(FormProvidersPaymentsComponent) RowProvidersPayment: FormProvidersPaymentsComponent;
  @ViewChild(FormCashPaymentsComponent) RowCashPayment: FormCashPaymentsComponent;
  @ViewChild(FormAchpaymentsComponent) RowACHPayment: FormAchpaymentsComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private messageService: GlobalService,
    private ticketsService: TicketsService,
    private multiplePaymentService: MultiplePaymentsService,
    private utilsService: UtilsService,
    private cdRef: ChangeDetectorRef) {
    this.amountAssetPayment = 0;
    this.amountProviderPayment = 0;
    this.amountCashPayment = 0;
    this.amountACHPayment = 0;
    this.verifyAmount = false;
    this.isPaymentSuccessful = false;
    this.isVisibleToken = false;
    this.isRemoveModalVisible = false;
    this.isDisabledAfterSave = false;
    this.isVisible = false;
    this.isVisibleButtonNew = true;
    this.List.isDisableAdd = true;
    this.isVisibleAuthandControllers = false;
    this.multiplePaymentData.amount = 0;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.approversRequest = {
      operationTypeId: OperationType.pagoMultiple,
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoMultiple],
      types: this.types
    });
  }

  handleObtainedTicket($event: TicketModel) {
    this.multiplePaymentData.isTicket = $event.isTicketSelected;
    this.multiplePaymentData.numberTicket = $event.ticket.ticket;
    this.multiplePaymentData.preferentialExchange = $event.ticket.exchangeRate;
    this.multiplePaymentData.indicatorBuyOrSale = $event.ticket.operationType;
  }

  handlePreviousForms() {
    this.multiplePaymentService
      .getForm().subscribe((resp: MassivePaymentsPreviousFormResult) => {
        this.previousForm = resp;
        this.isVisible = true;
        this.isVisibleButton = false;
        this.isVisibleButtonNew = false;
      }, (error) => this.messageService.info('Busqueda Inexistente', error));
  }

  handleButtons() {
    this.isVisibleButton = true;
    this.isVisibleButtonNew = false;
  }

  handleButtonFile() {
    this.isVisibleButtonNew = false;
    this.isVisibleComponentFile = true;
  }

  handleDateFuture($event: DateFutureModel) {
    this.multiplePaymentData.isScheduledProcess = $event.isDateFuture;
    this.multiplePaymentData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.multiplePaymentData.isMultipleDebits = $event.isMultipleDebit;
    this.multiplePaymentData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.multiplePaymentData.description = $event;
  }
  handleFile($event: FormData) {
    this.multiplePaymentService.chargeForm($event).subscribe((response: MultiplePaymentSpreadsheetsResult[]) => {
      this.detailSalaries.detail = response.filter(x => x.paymentType === Constants.SALARIES_PAYMENT);
      if (this.detailSalaries.detail.length > 0) { this.paymentTypeHAB = Constants.SALARIES_PAYMENT; }
      this.detailProviders.detail = response.filter(x => x.paymentType === Constants.PROVIDERS_PAYMENT);
      if (this.detailProviders.detail.length > 0) { this.paymentTypePROV = Constants.PROVIDERS_PAYMENT; }
      this.detailCash.detail = response.filter(x => x.paymentType === Constants.CASH_PAYMENT);
      if (this.detailCash.detail.length > 0) { this.paymentTypeEFE = Constants.CASH_PAYMENT; }
      this.detailAch.detail = response.filter(x => x.paymentType === Constants.ACH_PAYMENT);
      if (this.detailAch.detail.length > 0) { this.paymentTypeACH = Constants.ACH_PAYMENT; }
    }, (error) => this.messageService.danger('No se pudo cargar el archivo', error));
    this.isVisibleComponentFile = false;
    this.isVisibleButton = true;
  }

  handleEmails($event: EmailInputModel) {
    this.multiplePaymentData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.multiplePaymentData.currency = $event.currency;
    if (this.multiplePaymentData.amount === 0 || this.multiplePaymentData.amount === undefined) {
      this.verifyAmount = false;
    } else {
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.multiplePaymentData.fundDestination = $event.fundDestination;
    this.multiplePaymentData.fundSource = $event.fundSource;
  }

  handleList($event: string) {
    switch ($event) {
      case 'HAB':
        this.paymentTypeHAB = $event;
        if (this.RowAssetPayment !== undefined) {
          this.RowAssetPayment.handleNewRow();
        } else {
          this.isValidHAB = false;
        }
        break;
      case 'PROV':
        this.paymentTypePROV = $event;
        if (this.RowProvidersPayment !== undefined) {
          this.RowProvidersPayment.handleNewRow();
        } else {
          this.isValidPROV = false;
        }
        break;
      case 'EFE':
        this.paymentTypeEFE = $event;
        if (this.RowCashPayment !== undefined) {
          this.RowCashPayment.handleNewRow();
        } else {
          this.isValidEFE = false;
        }
        break;
      case 'ACH':
        this.paymentTypeACH = $event;
        if (this.RowACHPayment !== undefined) {
          this.RowACHPayment.handleNewRow();
        } else {
          this.isValidACH = false;
        }
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.multiplePaymentData.approvers = $event.approvers;
    this.multiplePaymentData.controllers = $event.controllers;
    this.multiplePaymentData.cismartApprovers = $event.cismartApprovers;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoMultiple,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.multiplePaymentData.sourceAccount = $event.number;
    this.multiplePaymentData.sourceAccountId = $event.id;
  }

  sumAmountTotal() {
    this.amountTotal = this.amountACHPayment + this.amountAssetPayment + this.amountCashPayment +
      this.amountProviderPayment;
    if (this.amountTotal !== 0) {
      this.multiplePaymentData.amount = this.amountTotal;
      const message = `Se actualizo el monto actual es de : ${this.multiplePaymentData.amount}
      ${this.multiplePaymentData.currency}`;
      this.messageService.success('Actualizacion:', message);
    } else {
      this.verifyAmount = false;
    }
  }

  handleSendId($event) {
    this.requestId.id = $event;
    this.paymentTypeACH = 'ACH';
    this.paymentTypePROV = 'PROV';
    this.paymentTypeEFE = 'EFE';
    this.paymentTypeHAB = 'HAB';
    this.isValidACH = this.isValidEFE = this.isValidHAB = this.isValidPROV = false;
    this.isVisibleButton = true;
    this.isVisible = false;
  }

  dataHandlerAssetPayment($event) {
    if ($event === false) {
      this.paymentTypeHAB = '';
      this.isValidHAB = true;
    }
  }

  dataHandlerProviderPayment($event) {
    if ($event === false) {
      this.paymentTypePROV = '';
      this.isValidPROV = true;
    }
  }

  dataHandlerCashPayment($event) {
    if ($event === false) {
      this.paymentTypeEFE = '';
      this.isValidEFE = true;
    }
  }

  dataHandlerACHPayment($event) {
    if ($event === false) {
      this.paymentTypeACH = '';
      this.isValidACH = true;
    }
  }

  handleActionRowAssetPayment($event) {
    this.multiplePaymentData.speeadsheet.formSalariesPayments = $event.detail;
    this.amountAssetPayment = $event.totalamount;
    this.sumAmountTotal();
    if (this.amountAssetPayment === 0) {
      this.isValidHAB = true;
      if (this.multiplePaymentData.amount === 0) {
        this.verifyAmount = false;
      }
    } else {
      this.verifyAmount = true;
    }
    this.List.isDisableAdd = false;
  }

  handleActionRowProvidersPayment($event) {
    this.multiplePaymentData.speeadsheet.formProvidersPayments = $event.detail;
    this.amountProviderPayment = $event.totalamount;
    this.sumAmountTotal();
    if (this.amountProviderPayment === 0) {
      this.isValidPROV = true;
      if (this.multiplePaymentData.amount === 0) {
        this.verifyAmount = false;
      }
    } else {
      this.verifyAmount = true;
    }
    this.List.isDisableAdd = false;
  }

  handleActionRowCashPayment($event) {
    this.multiplePaymentData.speeadsheet.formCashPayments = $event.detail;
    this.amountCashPayment = $event.totalamount;
    this.sumAmountTotal();
    if (this.amountCashPayment === 0) {
      this.isValidEFE = true;
      if (this.multiplePaymentData.amount === 0) {
        this.verifyAmount = false;
      }
    } else {
      this.verifyAmount = true;
    }
    this.List.isDisableAdd = false;
  }

  handleActionRowACHPayment($event) {
    this.multiplePaymentData.speeadsheet.formAchPayments = $event.detail;
    this.amountACHPayment = $event.totalamount;
    this.sumAmountTotal();
    if (this.amountACHPayment === 0) {
      this.isValidACH = true;
      if (this.multiplePaymentData.amount === 0) {
        this.verifyAmount = false;
      }
    } else {
      this.verifyAmount = true;
    }
    this.List.isDisableAdd = false;
  }

  handleSubmit() {
    if (this.multiplePaymentData.currency === undefined || this.multiplePaymentData.currency === Constants.EMPTY_STRING) {
      this.messageService.warning('Error de validación', 'Seleccione tipo de moneda para la transacción ');
      return;
    }
    if (this.multiplePaymentData.description === undefined || this.multiplePaymentData.description === Constants.EMPTY_STRING) {
      this.messageService.warning('Error de validación', 'Ingrese una descripción ');
      return;
    }
    this.showToken();
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.multiplePaymentData.tokenCode = $event.code;
    this.multiplePaymentData.tokenName = $event.name;
    this.savePayment();
  }

  savePayment() {
    this.multiplePaymentService.save(this.multiplePaymentData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('No se pudo Procesar la Operación', error.message));
  }

  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation
      && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.multiplePaymentData.speeadsheet.formAchPayments) ||
        this.utilsService.validateRows(this.multiplePaymentData.speeadsheet.formCashPayments) ||
        this.utilsService.validateRows(this.multiplePaymentData.speeadsheet.formProvidersPayments) ||
        this.utilsService.validateRows(this.multiplePaymentData.speeadsheet.formSalariesPayments)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.multiplePaymentData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.multiplePaymentData.currency, this.multiplePaymentData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.handleSubmit();
    }
  }

  validateGMESATicket() {
    if (!this.multiplePaymentData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.multiplePaymentData.currency, this.multiplePaymentData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.multiplePaymentData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.multiplePaymentData.numberTicket,
        amount: this.multiplePaymentData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.multiplePaymentData.preferentialExchange = resp.exchangeRate;
          this.multiplePaymentData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  getAmounts() {
    return this.multiplePaymentData.speeadsheet.formAchPayments.map(x => +x.amount)
      .concat(this.multiplePaymentData.speeadsheet.formCashPayments.map(x => +x.amount))
      .concat(this.multiplePaymentData.speeadsheet.formProvidersPayments.map(x => +x.amount))
      .concat(this.multiplePaymentData.speeadsheet.formSalariesPayments.map(x => +x.amount));
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
