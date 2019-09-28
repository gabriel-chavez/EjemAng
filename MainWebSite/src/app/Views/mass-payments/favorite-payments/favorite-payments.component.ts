import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { GlobalService } from '../../../Services/shared/global.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { FormPaymentsOfAssetsComponent } from '../components/multiple-payments-forms/form-payments-of-assets/form-payments-of-assets.component';
import { ListOfPaymentsSchedulesComponent } from '../components/list-of-payments-schedules/list-of-payments-schedules.component';
import { FormProvidersPaymentsComponent } from '../components/multiple-payments-forms/form-providers-payments/form-providers-payments.component';
import { FormCashPaymentsComponent } from '../components/multiple-payments-forms/form-cash-payments/form-cash-payments.component';
import { FormAchpaymentsComponent } from '../components/multiple-payments-forms/form-achpayments/form-achpayments.component';
import { FavoritePaymentsService } from '../../../Services/mass-payments/favorite-payments.service';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { FavoritePaymentsData } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payments-data';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { UtilsService } from '../../../Services/shared/utils.service';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { FavoritePaymentsSpreadsheetsResult } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { Constants } from '../../../Services/shared/enums/constants';
import { FavoritePaymentDetail } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payment-detail';
import { Router, NavigationEnd } from '@angular/router';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-favorite-payments',
  templateUrl: './favorite-payments.component.html',
  styleUrls: ['./favorite-payments.component.css'],
  providers: [TicketsService, FavoritePaymentsService, UtilsService],
})
export class FavoritePaymentsComponent implements OnInit {
  sourceAccountDto: AccountDto = new AccountDto();
  approversRequest: InputApprovers = new InputApprovers();
  ticketRequest: TicketDto = new TicketDto();
  data: CurrencyAndAmount = new CurrencyAndAmount();
  favoritePaymentData: FavoritePaymentsData = new FavoritePaymentsData();
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
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
  sourceAccount: AccountResult;
  types: string[] = ['P'];
  saleExchangeRate: number;
  excedeedAmount = false;
  isVisibleComponentFile = false;
  typeOfLoad: string;
  detailSalaries: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailProviders: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailCash: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailAch: FavoritePaymentDetail = new FavoritePaymentDetail;
  @ViewChild(ListOfPaymentsSchedulesComponent) List: ListOfPaymentsSchedulesComponent = new ListOfPaymentsSchedulesComponent();
  @ViewChild(FormPaymentsOfAssetsComponent) RowAssetPayment: FormPaymentsOfAssetsComponent;
  @ViewChild(FormProvidersPaymentsComponent) RowProvidersPayment: FormProvidersPaymentsComponent;
  @ViewChild(FormCashPaymentsComponent) RowCashPayment: FormCashPaymentsComponent;
  @ViewChild(FormAchpaymentsComponent) RowACHPayment: FormAchpaymentsComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;
  containAllData: number;
  containModalData: boolean;

  constructor(router: Router, private messageService: GlobalService,
    private ticketsService: TicketsService,
    private favoritePaymentService: FavoritePaymentsService,
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
    this.containAllData = 0;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoFavorito],
      types: this.types
    });
  }

  handleObtainedTicket($event: TicketModel) {
    this.favoritePaymentData.isTicket = $event.isTicketSelected;
    this.favoritePaymentData.numberTicket = $event.ticket.ticket;
    this.favoritePaymentData.preferentialExchange = $event.ticket.exchangeRate;
    this.favoritePaymentData.indicatorBuyOrSale = $event.ticket.operationType;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  handlePreviousForms() {
    if (this.handleVerify()) {
      this.favoritePaymentService.getForm().subscribe((resp: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = resp;
        this.isVisible = true;
        this.isVisibleButton = false;
        this.isVisibleButtonNew = false;
      }, (error) => this.messageService.info('Busqueda Inexistente', error));
    }
  }

  handleButtons() {
    if (this.handleVerify()) {
      this.paymentTypeACH = 'ACH';
      this.paymentTypePROV = 'PROV';
      this.paymentTypeEFE = 'EFE';
      this.paymentTypeHAB = 'HAB';
      this.isValidACH = this.isValidEFE = this.isValidHAB = this.isValidPROV = false;
      this.typeOfLoad = Constants.TYPEOFLOAD_MANUAL;
      this.isVisibleButton = true;
      this.isVisible = false;
      this.isVisibleButtonNew = false;
    }
  }
  handleDateFuture($event: DateFutureModel) {
    this.favoritePaymentData.isScheduledProcess = $event.isDateFuture;
    this.favoritePaymentData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.favoritePaymentData.isMultipleDebits = $event.isMultipleDebit;
    this.favoritePaymentData.operationNumberDebitHost = '';
  }
  handleButtonFile() {
    if (this.handleVerify()) {
      this.isVisibleButtonNew = false;
      this.isVisibleComponentFile = true;
    }
  }
  handleFile($event) {
    this.favoritePaymentService.chargeFormFavorite($event).subscribe((response: FavoritePaymentsSpreadsheetsResult[]) => {
      this.detailSalaries.detail = response.filter(x => x.paymentType === Constants.SALARIES_PAYMENT);
      if (this.detailSalaries.detail.length > 0) { this.paymentTypeHAB = Constants.SALARIES_PAYMENT; }
      this.detailProviders.detail = response.filter(x => x.paymentType === Constants.PROVIDERS_PAYMENT);
      if (this.detailProviders.detail.length > 0) { this.paymentTypePROV = Constants.PROVIDERS_PAYMENT; }
      this.detailCash.detail = response.filter(x => x.paymentType === Constants.CASH_PAYMENT);
      if (this.detailCash.detail.length > 0) { this.paymentTypeEFE = Constants.CASH_PAYMENT; }
      this.detailAch.detail = response.filter(x => x.paymentType === Constants.ACH_PAYMENT);
      if (this.detailAch.detail.length > 0) { this.paymentTypeACH = Constants.ACH_PAYMENT; }
      this.typeOfLoad = Constants.TYPEOFLOAD_FILECHARGE;
      this.isVisibleComponentFile = false;
      this.isVisibleButton = false;
    }, (error) => this.messageService.danger('No se pudo cargar el archivo', error));
  }

  handleDescription($event: string) {
    this.favoritePaymentData.description = $event;
  }
  handleEmails($event: EmailInputModel) {
    this.favoritePaymentData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.favoritePaymentData.currency = $event.currency;
    if (this.favoritePaymentData.amount === 0 || this.favoritePaymentData.amount === undefined) {
      this.verifyAmount = false;
    } else {
      this.verifyAmount = true;
    }
    this.favoritePaymentData.fundDestination = $event.fundDestination;
    this.favoritePaymentData.fundSource = $event.fundSource;
  }
  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.favoritePaymentData.approvers = $event.approvers;
    this.favoritePaymentData.controllers = $event.controllers;
    this.favoritePaymentData.cismartApprovers = $event.cismartApprovers;
  }
  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoFavorito,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.favoritePaymentData.sourceAccount = $event.number;
    this.favoritePaymentData.sourceAccountId = $event.id;
  }
  sumAmountTotal() {
    this.amountTotal = this.amountACHPayment + this.amountAssetPayment + this.amountCashPayment +
      this.amountProviderPayment;
    if (this.amountTotal !== 0) {
      this.favoritePaymentData.amount = this.amountTotal;
      const message = `Se actualizo el monto actual es de : ${this.favoritePaymentData.amount}
      ${this.favoritePaymentData.currency}`;
      this.messageService.success('Actualizacion de monto:', message);
      this.verifyAmount = true;
    } else {
      this.favoritePaymentData.amount = this.amountTotal;
      const message = `Se actualizo el monto actual es de : ${this.favoritePaymentData.amount}`;
      this.messageService.success('Actualizacion de monto:', message);
      this.verifyAmount = false;
    }
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeOfLoad = Constants.TYPEOFLOAD_AUTOMATIC;
    this.paymentTypeACH = 'ACH';
    this.paymentTypePROV = 'PROV';
    this.paymentTypeEFE = 'EFE';
    this.paymentTypeHAB = 'HAB';
    this.isValidACH = this.isValidEFE = this.isValidHAB = this.isValidPROV = false;
    this.isVisibleButton = true;
    this.isVisible = false;
    this.isVisibleButtonNew = false;
  }
  dataHandlerAssetPayment($event) {
    if ($event === false) {
      this.paymentTypeHAB = '';
      this.isValidHAB = true;
      this.containAllData++;
      this.validateAllData();
    }
  }
  dataHandlerProviderPayment($event) {
    if ($event === false) {
      this.paymentTypePROV = '';
      this.isValidPROV = true;
      this.containAllData++;
      this.validateAllData();
    }
  }
  dataHandlerCashPayment($event) {
    if ($event === false) {
      this.paymentTypeEFE = '';
      this.isValidEFE = true;
      this.containAllData++;
      this.validateAllData();
    }
  }
  dataHandlerACHPayment($event) {
    if ($event === false) {
      this.paymentTypeACH = '';
      this.isValidACH = true;
      this.containAllData++;
      this.validateAllData();
    }
  }

  validateAllData() {
    if (this.containAllData === 4) {
      this.containModalData = true;
    }
  }

  handleActionRowAssetPayment($event) {
    if ($event.detail !== undefined) {
      this.favoritePaymentData.speeadsheet.formSalariesPayments = $event.detail;
      this.amountAssetPayment = $event.totalamount;
    }
    // Seccion para la carga manual la verificacion de pagos por check
    if ($event.isChecked === true && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formSalariesPayments.push($event);
      this.amountAssetPayment += +$event.amount;
      this.sumAmountTotal();
    } else if (this.favoritePaymentData.speeadsheet.formSalariesPayments.includes($event) && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formSalariesPayments.splice(
        this.favoritePaymentData.speeadsheet.formSalariesPayments.indexOf($event, 0), 1);
      this.amountAssetPayment -= +$event.amount;
      this.sumAmountTotal();
    }
    // Seccion para la edicion de monto
    if (!$event.isEdit && ($event.typeOfLoad === Constants.TYPEOFLOAD_AUTOMATIC || $event.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE)) {
      this.amountAssetPayment = 0;
      for (let i = 0; i < this.favoritePaymentData.speeadsheet.formSalariesPayments.length; i++) {
        if (this.favoritePaymentData.speeadsheet.formSalariesPayments[i].code === $event.code) {
          this.favoritePaymentData.speeadsheet.formSalariesPayments[i].amount = $event.amount;
        }
        this.amountAssetPayment += +this.favoritePaymentData.speeadsheet.formSalariesPayments[i].amount;
      }
      this.sumAmountTotal();
    }
  }
  handleActionRowProvidersPayment($event) {
    if ($event.detail !== undefined) {
      this.favoritePaymentData.speeadsheet.formProvidersPayments = $event.detail;
      this.amountProviderPayment = $event.totalamount;
    }
    // Seccion para la carga manual la verificacion de pagos por check
    if ($event.isChecked === true && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formProvidersPayments.push($event);
      this.amountProviderPayment += +$event.amount;
      this.sumAmountTotal();
    } else if (this.favoritePaymentData.speeadsheet.formProvidersPayments.includes($event) && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formProvidersPayments.splice(
        this.favoritePaymentData.speeadsheet.formProvidersPayments.indexOf($event, 0), 1);
      this.amountProviderPayment -= +$event.amount;
      this.sumAmountTotal();
    }
    // Seccion para la edicion de monto
    if (!$event.isEdit && ($event.typeOfLoad === Constants.TYPEOFLOAD_AUTOMATIC || $event.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE)) {
      this.amountProviderPayment = 0;
      for (let i = 0; i < this.favoritePaymentData.speeadsheet.formProvidersPayments.length; i++) {
        if (this.favoritePaymentData.speeadsheet.formProvidersPayments[i].code === $event.code) {
          this.favoritePaymentData.speeadsheet.formProvidersPayments[i].amount = $event.amount;
        }
        this.amountProviderPayment += +this.favoritePaymentData.speeadsheet.formProvidersPayments[i].amount;
      }
      this.sumAmountTotal();
    }
  }

  handleActionRowCashPayment($event) {
    if ($event.detail !== undefined) {
      this.favoritePaymentData.speeadsheet.formCashPayments = $event.detail;
      this.amountCashPayment = $event.totalamount;
    }
    // Seccion para la carga manual la verificacion de pagos por check
    if ($event.isChecked === true && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formCashPayments.push($event);
      this.amountCashPayment += +$event.amount;
      this.sumAmountTotal();
    } else if (this.favoritePaymentData.speeadsheet.formCashPayments.includes($event) && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formCashPayments.splice(
        this.favoritePaymentData.speeadsheet.formCashPayments.indexOf($event, 0), 1);
      this.amountCashPayment -= +$event.amount;
      this.sumAmountTotal();
    }
    // Seccion para la edicion de monto
    if (!$event.isEdit && ($event.typeOfLoad === Constants.TYPEOFLOAD_AUTOMATIC || $event.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE)) {
      this.amountCashPayment = 0;
      for (let i = 0; i < this.favoritePaymentData.speeadsheet.formCashPayments.length; i++) {
        if (this.favoritePaymentData.speeadsheet.formCashPayments[i].code === $event.code) {
          this.favoritePaymentData.speeadsheet.formCashPayments[i].amount = $event.amount;
        }
        this.amountCashPayment += +this.favoritePaymentData.speeadsheet.formCashPayments[i].amount;
      }
      this.sumAmountTotal();
    }
  }
  handleActionRowACHPayment($event) {
    if ($event.detail !== undefined) {
      this.favoritePaymentData.speeadsheet.formAchPayments = $event.detail;
      this.amountACHPayment = $event.totalamount;
    }
    // Seccion para la carga manual la verificacion de pagos por check
    if ($event.isChecked === true && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formAchPayments.push($event);
      this.amountACHPayment += +$event.amount;
      this.sumAmountTotal();
    } else if (this.favoritePaymentData.speeadsheet.formAchPayments.includes($event) && $event.typeOfLoad === Constants.TYPEOFLOAD_MANUAL) {
      this.favoritePaymentData.speeadsheet.formAchPayments.splice(
        this.favoritePaymentData.speeadsheet.formAchPayments.indexOf($event, 0), 1);
      this.amountACHPayment -= +$event.amount;
      this.sumAmountTotal();
    }
    // Seccion para la edicion de monto
    if (!$event.isEdit && ($event.typeOfLoad === Constants.TYPEOFLOAD_AUTOMATIC || $event.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE)) {
      this.amountACHPayment = 0;
      for (let i = 0; i < this.favoritePaymentData.speeadsheet.formAchPayments.length; i++) {
        if (this.favoritePaymentData.speeadsheet.formAchPayments[i].code === $event.code) {
          this.favoritePaymentData.speeadsheet.formAchPayments[i].amount = $event.amount;
        }
        this.amountACHPayment += +this.favoritePaymentData.speeadsheet.formAchPayments[i].amount;
      }
      this.sumAmountTotal();
    }
  }

  handleSubmit() {
    this.showToken();
  }
  handleVerify() {
    if (this.favoritePaymentData.currency === undefined || this.favoritePaymentData.currency === '') {
      this.messageService.warning('Error de validación', 'Seleccione tipo de moneda para la transacción ');
      return false;
    }
    if (this.favoritePaymentData.description === undefined || this.favoritePaymentData.description === '') {
      this.messageService.warning('Error de validación', 'Ingrese una descripción ');
      return false;
    }
    return true;
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.favoritePaymentData.tokenCode = $event.code;
    this.favoritePaymentData.tokenName = $event.name;
    this.savePayment();
  }

  savePayment() {
    this.favoritePaymentService.save(this.favoritePaymentData).subscribe(
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
      if (!this.favoritePaymentData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.favoritePaymentData.currency, this.favoritePaymentData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.handleSubmit();
    }
  }

  validateGMESATicket() {
    if (!this.favoritePaymentData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.favoritePaymentData.currency, this.favoritePaymentData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.favoritePaymentData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.favoritePaymentData.numberTicket,
        amount: this.favoritePaymentData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.favoritePaymentData.preferentialExchange = resp.exchangeRate;
          this.favoritePaymentData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  getAmounts() {
    return this.favoritePaymentData.speeadsheet.formAchPayments.map(x => +x.amount)
      .concat(this.favoritePaymentData.speeadsheet.formCashPayments.map(x => +x.amount))
      .concat(this.favoritePaymentData.speeadsheet.formProvidersPayments.map(x => +x.amount))
      .concat(this.favoritePaymentData.speeadsheet.formSalariesPayments.map(x => +x.amount));
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
