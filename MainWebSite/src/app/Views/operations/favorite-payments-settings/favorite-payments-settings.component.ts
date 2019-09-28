import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ListOfPaymentsSchedulesComponent } from '../../mass-payments/components/list-of-payments-schedules/list-of-payments-schedules.component';
import { FavoritePaymentsService } from '../../../Services/mass-payments/favorite-payments.service';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { FormPaymentsOfAssetsComponent } from '../components/form-favorite-payments/form-payments-of-assets/form-payments-of-assets.component';
import { FormProvidersPaymentsComponent } from '../components/form-favorite-payments/form-providers-payments/form-providers-payments.component';
import { FormCashPaymentsComponent } from '../components/form-favorite-payments/form-cash-payments/form-cash-payments.component';
import { FormAchpaymentsComponent } from '../components/form-favorite-payments/form-achpayments/form-achpayments.component';
import { GlobalService } from '../../../Services/shared/global.service';
import { FavoritePaymentsData } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payments-data';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { FavoritePaymentsSpreadsheetsResult } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { Constants } from '../../../Services/shared/enums/constants';
import { FavoritePaymentDetail } from '../../../Services/mass-payments/Models/favorite-payments/favorite-payment-detail';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { UtilsService } from '../../../Services/shared/utils.service';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { Router } from '@angular/router';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-favorite-payments-settings',
  templateUrl: './favorite-payments-settings.component.html',
  styleUrls: ['./favorite-payments-settings.component.css'],
  providers: [FavoritePaymentsService, UtilsService]
})
export class FavoritePaymentsSettingsComponent implements OnInit {
  isVisible: boolean;
  isVisibleButton: boolean;
  approversRequest: InputApprovers = new InputApprovers();
  amountAssetPayment = 0;
  amountProviderPayment = 0;
  amountCashPayment = 0;
  amountACHPayment = 0;
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
  typeOfLoad: string;
  isRemoveModalVisible: boolean;
  isDisabledAfterSave: boolean;
  isPaymentSuccessful: boolean;
  isVisibleToken: boolean;
  processBatchNumber: number;
  isVisibleComponentFile = false;
  isVisibleComponentSelector = false;
  isVisibleButtonSend = false;
  verfyChanges = false;
  detailSalaries: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailProviders: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailCash: FavoritePaymentDetail = new FavoritePaymentDetail;
  detailAch: FavoritePaymentDetail = new FavoritePaymentDetail;
  favoritePaymentData: FavoritePaymentsData = new FavoritePaymentsData();
  favoritePaymentVerify: FavoritePaymentsData = new FavoritePaymentsData();
  favoritePaymentDataRemoved: FavoritePaymentsData = new FavoritePaymentsData();
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  @ViewChild(ListOfPaymentsSchedulesComponent) List: ListOfPaymentsSchedulesComponent = new ListOfPaymentsSchedulesComponent();
  @ViewChild(FormPaymentsOfAssetsComponent) RowAssetPayment: FormPaymentsOfAssetsComponent;
  @ViewChild(FormProvidersPaymentsComponent) RowProvidersPayment: FormProvidersPaymentsComponent;
  @ViewChild(FormCashPaymentsComponent) RowCashPayment: FormCashPaymentsComponent;
  @ViewChild(FormAchpaymentsComponent) RowACHPayment: FormAchpaymentsComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private messageService: GlobalService,
    private favoritePaymentService: FavoritePaymentsService,
    private cdRef: ChangeDetectorRef, private utilsService: UtilsService) {
    this.verifyAmount = false;
    this.isVisible = false;
    this.isVisibleButton = true;
    this.List.isDisableAdd = true;
    this.amountTotal = 0;
    this.isVisibleToken = false;
    this.isRemoveModalVisible = false;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.approversRequest = {
      operationTypeId: OperationType.formularioSolicitud,
    };
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  handleButtonFile() {
    this.isVisibleButton = false;
    this.isVisibleComponentFile = true;
  }

  handleFile($event) {
    this.isVisibleComponentFile = false;
    this.isVisibleComponentSelector = true;
    this.favoritePaymentService.chargeFormConfigurationFavorite($event).subscribe((response: FavoritePaymentsSpreadsheetsResult[]) => {
      this.detailSalaries.detail = response.filter(x => x.paymentType === Constants.SALARIES_PAYMENT);
      if (this.detailSalaries.detail.length > 0) { this.paymentTypeHAB = Constants.SALARIES_PAYMENT; }
      this.detailProviders.detail = response.filter(x => x.paymentType === Constants.PROVIDERS_PAYMENT);
      if (this.detailProviders.detail.length > 0) { this.paymentTypePROV = Constants.PROVIDERS_PAYMENT; }
      this.detailCash.detail = response.filter(x => x.paymentType === Constants.CASH_PAYMENT);
      if (this.detailCash.detail.length > 0) { this.paymentTypeEFE = Constants.CASH_PAYMENT; }
      this.detailAch.detail = response.filter(x => x.paymentType === Constants.ACH_PAYMENT);
      if (this.detailAch.detail.length > 0) { this.paymentTypeACH = Constants.ACH_PAYMENT; }
      this.typeOfLoad = Constants.TYPEOFLOAD_FILECHARGE;
    }, (error) => {
      this.isVisibleComponentSelector = false;
      this.isVisibleComponentFile = true;
      this.messageService.danger('No se pudo cargar el archivo', error);
    });
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
  dataHandlerAssetPayment($event) {
    if ($event === false) {
      this.paymentTypeHAB = '';
      this.isValidHAB = true;
      this.detailSalaries.isNew = true;
      this.typeOfLoad = '';
    }
  }
  dataHandlerProviderPayment($event) {
    if ($event === false) {
      this.paymentTypePROV = '';
      this.isValidPROV = true;
      this.detailProviders.isNew = true;
      this.typeOfLoad = '';
    }
  }
  dataHandlerCashPayment($event) {
    if ($event === false) {
      this.paymentTypeEFE = '';
      this.isValidEFE = true;
      this.detailCash.isNew = true;
    }
  }
  dataHandlerACHPayment($event) {
    if ($event === false) {
      this.paymentTypeACH = '';
      this.isValidACH = true;
      this.detailAch.isNew = true;
    }
  }
  sumAmountTotal() {
    if (this.amountACHPayment !== 0 || this.amountAssetPayment !== 0 || this.amountCashPayment !== 0 || this.amountProviderPayment !== 0) {
      this.amountTotal = +this.amountACHPayment + +this.amountAssetPayment + +this.amountCashPayment +
        +this.amountProviderPayment;
      this.amountTotal === 0 ? this.isVisibleButtonSend = false : this.isVisibleButtonSend = true;
      const message = `Se actualizo el monto actual de la planilla es : ${this.amountTotal} BOLIVIANOS`;
      this.messageService.success('Actualizacion:', message);
    }
  }
  handleActionRowAssetPayment($event) {
    this.favoritePaymentData.speeadsheet.formSalariesPayments = Object.assign($event.detail);
    if ($event.detail.length === 0) {
      this.dataHandlerAssetPayment(false);
      this.List.isDisableAdd = false;
      return;
    }
    if (this.verifyDuplicateCode($event.detail[$event.detail.length - 1].code)) {
      this.amountAssetPayment = $event.totalamount;
      this.sumAmountTotal();
      if (this.amountAssetPayment === 0) {
        this.isValidHAB = true;
        if (this.amountTotal === 0) {
          this.verifyAmount = false;
        }
      } else {
        this.verifyAmount = true;
      }
      this.List.isDisableAdd = false;
    }
  }
  handleActionRowProvidersPayment($event) {
    this.favoritePaymentData.speeadsheet.formProvidersPayments = Object.assign($event.detail);
    if ($event.detail.length === 0) {
      this.dataHandlerProviderPayment(false);
      this.List.isDisableAdd = false;
      return;
    }
    if (this.verifyDuplicateCode($event.detail[$event.detail.length - 1].code)) {
      this.amountProviderPayment = $event.totalamount;
      this.sumAmountTotal();
      if (this.amountProviderPayment === 0) {
        this.isValidPROV = true;
        if (this.amountTotal === 0) {
          this.verifyAmount = false;
        }
      } else {
        this.verifyAmount = true;
      }
      this.List.isDisableAdd = false;
    }
  }
  handleActionRowCashPayment($event) {
    this.favoritePaymentData.speeadsheet.formCashPayments = Object.assign($event.detail);
    if ($event.detail.length === 0) {
      this.dataHandlerCashPayment(false);
      this.List.isDisableAdd = false;
      return;
    }
    if (this.verifyDuplicateCode($event.detail[$event.detail.length - 1].code)) {
      this.amountCashPayment = $event.totalamount;
      this.sumAmountTotal();
      if (this.amountCashPayment === 0) {
        this.isValidEFE = true;
        if (this.amountTotal === 0) {
          this.verifyAmount = false;
        }
      } else {
        this.verifyAmount = true;
      }
      this.List.isDisableAdd = false;
    }
  }
  handleActionRowACHPayment($event) {
    this.favoritePaymentData.speeadsheet.formAchPayments = Object.assign($event.detail);
    if ($event.detail.length === 0) {
      this.dataHandlerACHPayment(false);
      this.List.isDisableAdd = false;
      return;
    }
    if (this.verifyDuplicateCode($event.detail[$event.detail.length - 1].code)) {
      this.amountACHPayment = $event.totalamount;
      this.sumAmountTotal();
      if (this.amountACHPayment === 0) {
        this.isValidACH = true;
        if (this.amountTotal === 0) {
          this.verifyAmount = false;
        }
      } else {
        this.verifyAmount = true;
      }
      this.List.isDisableAdd = false;
    }
  }
  verifyDuplicateCode($event: string) {
    const verifyArray = this.favoritePaymentData.speeadsheet.formAchPayments
      .concat(this.favoritePaymentData.speeadsheet.formCashPayments)
      .concat(this.favoritePaymentData.speeadsheet.formProvidersPayments)
      .concat(this.favoritePaymentData.speeadsheet.formSalariesPayments);
    if (verifyArray.find(x => x.code === $event && verifyArray.filter(y => y.code === $event).length === 2)) {
      this.List.isDisableAdd = true;
      this.isVisibleButtonSend = false;
      this.messageService.danger('Error en el nuevo código insertado:', $event + ' No se permite reutilizar y/o duplicar los codigos insertados');
      return false;
    } else {
      return true;
    }
  }

  handleDataAsset($event) {
    this.favoritePaymentVerify.speeadsheet.formSalariesPayments = Object.assign(this.favoritePaymentVerify.speeadsheet.formSalariesPayments, $event);
  }

  handleDataProviders($event) {
    this.favoritePaymentVerify.speeadsheet.formProvidersPayments = Object.assign(this.favoritePaymentVerify.speeadsheet.formProvidersPayments, $event);
  }

  handleDataCash($event) {
    this.favoritePaymentVerify.speeadsheet.formCashPayments = Object.assign(this.favoritePaymentVerify.speeadsheet.formCashPayments, $event);
  }

  handleDataACH($event) {
    this.favoritePaymentVerify.speeadsheet.formAchPayments = Object.assign(this.favoritePaymentVerify.speeadsheet.formAchPayments, $event);
  }

  handleRemovedACHPayment($event) {
    this.favoritePaymentDataRemoved.speeadsheet.formAchPayments.push($event.detail);
  }
  handleRemovedCashPayment($event) {
    this.favoritePaymentDataRemoved.speeadsheet.formCashPayments.push($event.detail);
  }
  handleRemovedProvidersPayment($event) {
    this.favoritePaymentDataRemoved.speeadsheet.formProvidersPayments.push($event.detail);
  }
  handleRemovedAssetsPayment($event) {
    this.favoritePaymentDataRemoved.speeadsheet.formSalariesPayments.push($event.detail);
  }
  handleButtons() {
    this.paymentTypeACH = Constants.ACH_PAYMENT;
    this.paymentTypePROV = Constants.PROVIDERS_PAYMENT;
    this.paymentTypeEFE = Constants.CASH_PAYMENT;
    this.paymentTypeHAB = Constants.SALARIES_PAYMENT;
    this.isValidACH = this.isValidEFE = this.isValidHAB = this.isValidPROV = false;
    this.isVisibleButton = false;
    this.isVisible = false;
    this.isVisibleComponentSelector = true;
    this.typeOfLoad = Constants.TYPEOFLOAD_MANUAL;
  }
  buildRequest() {
    const { favoritePaymentData, favoritePaymentDataRemoved, favoritePaymentVerify } = this;
    favoritePaymentData.amount = favoritePaymentVerify.amount = this.amountTotal;
    favoritePaymentData.currency = favoritePaymentVerify.currency = 'BOL';
    favoritePaymentData.sourceAccountId = favoritePaymentVerify.sourceAccountId = 0;
    favoritePaymentData.sourceAccount = favoritePaymentVerify.sourceAccount = '0000000000000';
    this.handleFavoritePayment(favoritePaymentData, favoritePaymentDataRemoved);
    if (JSON.stringify(this.favoritePaymentData) === JSON.stringify(this.favoritePaymentVerify)) {
      this.messageService.info('Error de validación: ', 'No se realizaron cambios, no puede generar el lote');
      return false;
    } else {
      return true;
    }
  }

  private handleFavoritePayment(favoritePaymentData: FavoritePaymentsData, favoritePaymentDataRemoved: FavoritePaymentsData) {
    favoritePaymentData.speeadsheet.formAchPayments =
      favoritePaymentData.speeadsheet.formAchPayments.concat(favoritePaymentDataRemoved.speeadsheet.formAchPayments);
      this.favoritePaymentDataRemoved.speeadsheet.formAchPayments = [];
    favoritePaymentData.speeadsheet.formCashPayments =
      favoritePaymentData.speeadsheet.formCashPayments.concat(favoritePaymentDataRemoved.speeadsheet.formCashPayments);
      this.favoritePaymentDataRemoved.speeadsheet.formCashPayments = [];
    favoritePaymentData.speeadsheet.formProvidersPayments =
      favoritePaymentData.speeadsheet.formProvidersPayments.concat(favoritePaymentDataRemoved.speeadsheet.formProvidersPayments);
      this.favoritePaymentDataRemoved.speeadsheet.formProvidersPayments = [];
    favoritePaymentData.speeadsheet.formSalariesPayments =
      favoritePaymentData.speeadsheet.formSalariesPayments.concat(favoritePaymentDataRemoved.speeadsheet.formSalariesPayments);
      this.favoritePaymentDataRemoved.speeadsheet.formAchPayments = [];
  }

  handleSubmit(approversAndControllersValidation: boolean) {
    if (this.utilsService.validateRows(this.favoritePaymentData.speeadsheet.formAchPayments) ||
      this.utilsService.validateRows(this.favoritePaymentData.speeadsheet.formCashPayments) ||
      this.utilsService.validateRows(this.favoritePaymentData.speeadsheet.formProvidersPayments) ||
      this.utilsService.validateRows(this.favoritePaymentData.speeadsheet.formSalariesPayments)) {
      return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
    }
    if (this.buildRequest() && approversAndControllersValidation) {
      this.showToken();
    } else {
      this.isVisibleToken = false;
    }
  }
  handleTokenSubmit($event: TokenCredentials) {
    this.favoritePaymentData.tokenCode = $event.code;
    this.favoritePaymentData.tokenName = $event.name;
    this.savePayment();
  }
  savePayment() {
    this.favoritePaymentService.saveConfiguration(this.favoritePaymentData).subscribe((response: ProcessBatchResult) => {
      this.processBatchNumber = response.processBatchId;
      this.isVisibleToken = false;
      this.isPaymentSuccessful = true;
      this.isDisabledAfterSave = true;
      this.isRemoveModalVisible = true;
    }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
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
