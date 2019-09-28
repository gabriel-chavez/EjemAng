import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { BanksResult } from '../../../../../Services/mass-payments/Models/banks-result';
import { MultiplePaymentSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-achpayment]',
  templateUrl: './row-list-details-achpayment.component.html',
  styleUrls: ['./row-list-details-achpayment.component.css'],
  providers: [ParametersService],
})
export class RowListDetailsAchpaymentComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('accountNumberForm') accountNumberForm: NgForm;
  @ViewChild('titularNameForm') titularNameForm: NgForm;
  @ViewChild('firstDetailForm') firstDetailForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;
  
  @Input() detail: MultiplePaymentSpreadsheetsResult;
  @Output() action = new EventEmitter();
  aux: any;
  banks: Array<any>;
  cities: Array<any>;
  descriptionCity: string;
  descriptionBank: string;
  isUpdateModalVisible = false;
  maximumDigitsAllowed = 14;
  constructor(private messageService: GlobalService,
  private parameterService: ParametersService) {
   }

  ngOnInit() {
   this.handleComponent(this.detail.isEdit);
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
     }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
    this.parameterService.getBankList().subscribe((resp: BanksResult[]) => {
       this.banks = resp;
       if (this.banks.length > 0 && this.detail.bankId ===  undefined) {
         this.descriptionBank = this.banks[0].description;
        this.detail.bankId = this.banks[0];
       } else {
        for (let i = 0; i < this.banks.length; i++) {
          if (this.detail.bankId === this.banks[i].code) {
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
    for (let i = 0; i < this.cities.length; i++) {
      if (this.detail.branchOfficeId.toString() === this.cities[i].code) {
        this.detail.branchOfficeId = this.cities[i];
      }
    }
    for (let i = 0; i < this.banks.length; i++) {
      if (this.detail.bankId === this.banks[i].code) {
        this.detail.bankId = this.banks[i];
      }
    }
  }
  handleAccept($eventBank, $eventCity) {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if (this.detail.isEdit && ($eventBank.value === undefined || $eventCity.value === undefined || $eventCity.value === undefined)) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar' + $eventBank.value === undefined ? 'eel banco de la transacción' :
      $eventCity.value === undefined ? 'la sucursal del pago' : '');
      return;
    }
    this.descriptionBank = $eventBank.description;
    this.descriptionCity = $eventCity.description;
    this.detail.branchOfficeId = $eventCity.code;
    this.detail.bankId = $eventBank.code;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.accountNumber === undefined || this.detail.accountNumber === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Número destino de cuenta');
      return;
    }
    if (this.detail.titularName === undefined || this.detail.titularName === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Nombre del Beneficiario');
      return;
    }
    if (this.detail.mail !== undefined) {
      if (this.detail.mail === '') {} else {
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
    this.detail.paymentType = 'ACH';
    this.action.emit({ action: 'accept', data: this.detail});
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
    if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.accountNumber === undefined
    || this.detail.titularName === undefined) {
        this.handleDelete();
      }
    if (this.detail.titularName !== undefined && this.detail.branchOfficeId !== undefined ) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventBank, $eventCity) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.accountNumberForm.form);
    this.messageService.validateAllFormFields(this.titularNameForm.form);
    this.messageService.validateAllFormFields(this.firstDetailForm.form);

    if (this.amountForm.valid && this.accountNumberForm.valid && this.titularNameForm.valid && this.firstDetailForm.valid && 
      (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventBank, $eventCity);
    }    
  }
}
