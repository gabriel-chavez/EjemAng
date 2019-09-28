import { ValidateConst } from '../../../../../Directives/validate-const';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { PaymentAchService } from '../../../../../Services/mass-payments/payment-ach.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { PaymentAchSpreadsheetResult } from '../../../../../Services/mass-payments/Models/payment-ach/payment-ach-spreadsheet-result';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { BanksResult } from '../../../../../Services/mass-payments/Models/banks-result';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-payment-ach]',
  templateUrl: './row-payment-ach.component.html',
  styleUrls: ['./row-payment-ach.component.css'],
  providers: [PaymentAchService]
})
export class RowPaymentAchComponent implements OnInit {
  @ViewChild('targetAccountForm') targetAccountForm: NgForm;
  @ViewChild('beneficiaryForm') beneficiaryForm: NgForm;
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('detailsForm') detailsForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;
  @Input() detail: PaymentAchSpreadsheetResult;
  @Output() action = new EventEmitter();
  aux: any;
  isUpdateModalVisible = false;
  cities: Array<any>;
  banks: Array<any>;
  descriptionCity: string;
  descriptionBank: string;
  descriptionDocType: string;
  constants: Constants = new Constants;
  maximumDigitsAllowed = 16;

  constructor(private messageService: GlobalService,
    private parameterService: ParametersService) { }

  ngOnInit() {
    this.parameterService.getBranchOffices()
      .subscribe((response: BranchOfficeResult[]) => {
        this.cities = response;
        if (this.cities.length > 0 && this.detail.branchOfficeId === undefined) {
          this.descriptionCity = this.cities[0].description;
          this.detail.branchOfficeId = this.cities[0];
        } else {
          for (let i = 0; i < this.cities.length; i++) {
            if (this.detail.branchOfficeId.toString() === this.cities[i].code) {
              this.descriptionCity = this.cities[i].description;
            }
          }
        }
      }, (error) => this.messageService.danger('', error.message));
    this.parameterService.getBankList().subscribe((resp: BanksResult[]) => {
      this.banks = resp;
      if (this.banks.length > 0 && this.detail.banksAchCode === undefined) {
        this.descriptionBank = this.banks[0].description;
        this.detail.banksAchCode = this.banks[0];
      } else {
        for (let i = 0; i < this.banks.length; i++) {
          if (this.detail.banksAchCode === this.banks[i].code) {
            this.descriptionBank = this.banks[i].description;
          }
        }
      }
    }, (error) => this.messageService.danger('', error.message));
  }
  handleRenewLists() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.detail.branchOfficeId === this.cities[i].code) {
        this.detail.branchOfficeId = this.cities[i];
      }
    }
    for (let i = 0; i < this.banks.length; i++) {
      if (this.detail.banksAchCode === this.banks[i].code) {
        this.detail.banksAchCode = this.banks[i];
      }
    }
  }
  handleAccept($eventBank, $eventCity) {
    this.descriptionCity = $eventCity.description;
    this.descriptionBank = $eventBank.description;
    this.detail.branchOfficeId = $eventCity.code;
    this.detail.banksAchCode = $eventBank.code;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.beneficiary === undefined || this.detail.beneficiary === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Nombre del Beneficiario');
      return;
    }
    if (this.detail.targetAccount === undefined || this.detail.targetAccount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Numero de Cuenta');
      return;
    }
    this.aux = this.detail.targetAccount.toString();
    if (this.aux.length < 5) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El Número de cuenta, debe tener mínimo 5 dígitos');
      return;
    }
    if (this.detail.mail !== undefined) {
      if (this.detail.mail === '') { } else {
        const errorMessages = ValidateConst;
        const validateType = errorMessages.find(x => x.type === 'email');
        const isValidAccount = validateType.regex.test(this.detail.mail);
        if (!isValidAccount) {
          this.detail.isEdit = true;
          this.handleRenewLists();
          this.messageService.warning('Error de validación:', 'Introduzca un correo válido');
          return;
        }
      }
    }
    this.action.emit({ action: 'accept', data: this.detail });
  }
  handleEdit() {
    this.handleRenewLists();
    this.detail.isEdit = true;
    this.action.emit({ action: 'edit', data: this.detail });
  }

  handleDelete() {
    this.isUpdateModalVisible = false;
    this.action.emit({ action: 'delete', data: this.detail });
  }

  handleCancel() {
    if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.beneficiary === undefined
      || this.detail.details === undefined) {
      this.handleDelete();
    }
    if (this.detail.branchOfficeId !== undefined) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventBank, $eventCity) {
    this.messageService.validateAllFormFields(this.targetAccountForm.form);
    this.messageService.validateAllFormFields(this.beneficiaryForm.form);
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.detailsForm.form);

    if (this.targetAccountForm.valid && this.beneficiaryForm.valid && this.amountForm.valid && this.detailsForm.valid &&
      (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail === '')) {
        this.handleAccept($eventBank, $eventCity);
    }
  }
}
