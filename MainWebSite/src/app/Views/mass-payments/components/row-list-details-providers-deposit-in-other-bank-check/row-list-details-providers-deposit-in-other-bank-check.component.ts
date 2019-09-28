import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProvidersDepositInOtherBankCheckSpreadsheetsResult } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-result';
import { InformationProvidersDepositInOtherBankCheckResult } from '../../../../Services/providersDepositInOtherBankCheck/models/information-providers-deposit-in-other-bank-check-result';
import { ProvidersDepositInOtherBankCheckResult } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-result';
import { GlobalService } from '../../../../Services/shared/global.service';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { DetailProvider } from '../../../../Services/providersCheckManagement/models/detail-provider';
import { BranchOfficeResult } from '../../../../Services/providersCheckManagement/models/branch-office-result';
import { BanksResult } from '../../../../Services/mass-payments/Models/banks-result';
import { ValidateConst } from '../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-providers-deposit-in-other-bank-check]',
  templateUrl: './row-list-details-providers-deposit-in-other-bank-check.component.html',
  styleUrls: ['./row-list-details-providers-deposit-in-other-bank-check.component.css'],
  providers: [ParametersService],
})
export class RowListDetailsProvidersDepositInOtherBankCheckComponent implements OnInit {
  @ViewChild('accountNumberForm') accountNumberForm: NgForm;
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('beneficiaryReasonForm') beneficiaryReasonForm: NgForm;
  @ViewChild('instructionsForm') instructionsForm: NgForm;
  @ViewChild('detailForm') detailForm: NgForm;
  @ViewChild('emailProviderForm') emailProviderForm: NgForm;
  @Input() detail: ProvidersDepositInOtherBankCheckSpreadsheetsResult;
  @Output() action = new EventEmitter();
  extensions: Constants = new Constants;
  aux: any;
  isUpdateModalVisible = false;
  banks: Array<any>;
  descriptionBank: string;
  detailAux: ProvidersDepositInOtherBankCheckSpreadsheetsResult = new ProvidersDepositInOtherBankCheckSpreadsheetsResult();
  constants: Constants = new Constants;

  constructor(private messageService: GlobalService, private parameterService: ParametersService) { }

  ngOnInit() {
    this.handleComponent(this.detail.isEdit);
    this.parameterService.getBankList()
      .subscribe((response: BanksResult[]) => {
        this.banks = response;
        if (this.banks.length > 0 && this.detail.bank === undefined) {
          this.descriptionBank = this.banks[0].description;
          this.detail.bank = this.banks[0];
        } else {
          for (let i = 0; i < this.banks.length; i++) {
            if (this.detail.bank.toString() === this.banks[i].code) {
              this.descriptionBank = this.banks[i].description;
            }
          }
        }
      }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
  }

  handleComponent($event) {
    this.detail.isEdit = $event;
  }

  handleRenewLists() {
    for (let i = 0; i < this.banks.length; i++) {
      if (this.detail.bank === this.banks[i].code) {
        this.detail.bank = this.banks[i];
      }
    }
  }
  handleAccept($eventBank) {
    if (+this.detail.amount === 0) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    this.descriptionBank = $eventBank.description;
    this.detail.bank = $eventBank.code;
    this.detail.isEdit = false;

    if (this.detail.destinationAccount === undefined || this.detail.destinationAccount === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la Cuenta Destino');
      return;
    }

    if (this.detail.amount === undefined || this.detail.amount.toString() === '' || this.detail.amount < 1) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.beneficiaryReason === undefined || this.detail.beneficiaryReason === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la Razón del Beneficiario');
      return;
    }
    if (this.detail.instructions === undefined || this.detail.instructions === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar las Instrucciones');
      return;
    }
    if (this.detail.detail === undefined || this.detail.detail === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Detalle');
      return;
    }
    if (this.detail.bank === undefined || this.detail.bank === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Banco');
      return;
    }
    this.detail.type = 'CM';
    this.action.emit({ action: 'accept', data: this.detail });
  }

  handleEdit() {
    this.detailAux = Object.assign(this.detailAux, this.detail);
    this.handleRenewLists();
    this.detail.isEdit = true;
    this.action.emit({ action: 'edit', data: this.detail });
  }

  handleDelete() {
    this.isUpdateModalVisible = false;
    this.action.emit({ action: 'delete', data: this.detail });
  }

  handleCancel() {
    this.detail = Object.assign(this.detail, this.detailAux);
    if (this.detail.amount === undefined || this.detail.beneficiaryReason === undefined
      || this.detail.instructions === undefined || this.detail.detail === undefined || this.detail.emailProvider === undefined || this.detail.type === 'CA') {
      this.handleDelete();
    }
    if (this.detail.bank !== undefined) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventBank) {
    this.messageService.validateAllFormFields(this.accountNumberForm.form);
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.beneficiaryReasonForm.form);
    this.messageService.validateAllFormFields(this.instructionsForm.form);
    this.messageService.validateAllFormFields(this.detailForm.form);

    if (this.accountNumberForm.valid && this.amountForm.valid && this.beneficiaryReasonForm.valid && this.instructionsForm.valid && 
      this.detailForm.valid && (this.emailProviderForm.valid || this.detail.emailProvider === undefined || this.detail.emailProvider ==='' || this.detail.emailProvider === null)) {
        this.handleAccept($eventBank);
    }
  }
}
