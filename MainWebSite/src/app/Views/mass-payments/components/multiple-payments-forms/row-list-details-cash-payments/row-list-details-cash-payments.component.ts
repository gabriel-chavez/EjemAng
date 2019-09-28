import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { MultiplePaymentSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-cash-payments]',
  templateUrl: './row-list-details-cash-payments.component.html',
  styleUrls: ['./row-list-details-cash-payments.component.css'],
  providers: [ParametersService],
})
export class RowListDetailsCashPaymentsComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('titularNameForm') titularNameForm: NgForm;
  @ViewChild('firstLastNameForm') firstLastNameForm: NgForm;
  @ViewChild('secondLastNameForm') secondLastNameForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('documentExtensionForm') documentExtensionForm: NgForm;
  @ViewChild('instruccionsPaymentForm') instruccionsPaymentForm: NgForm;
  @ViewChild('firstDetailForm') firstDetailForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;
  
  @Input() detail: MultiplePaymentSpreadsheetsResult;
  @Output() action = new EventEmitter();
  aux: any;
  isUpdateModalVisible = false;
  cities: Array<any>;
  descriptionCity: string;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  constants: Constants = new Constants;
  maximumDigitsAllowed = 14;
  constructor(private messageService: GlobalService,
    private parameterService: ParametersService) { }

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
   if (this.detail.documentType === undefined) {
    this.detail.documentType = this.constants.documentTypes[0];
   } else {
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.documentType === this.constants.documentTypes[i].value) {
        this.descriptionDocType = this.constants.documentTypes[i].name;
      }
    }
   }
   if (this.detail.documentExtension === undefined) {
    this.detail.documentExtension = this.constants.documentExtensions[0];
   } else {
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      this.detail.documentExtension = this.detail.documentExtension.replace(' ', Constants.EMPTY_STRING);
      if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
        this.descriptionDocExt = this.constants.documentExtensions[i].name;
      } else {
        this.detail.documentExtension = this.detail.documentExtension;
      }
    }
   }
  }
  handleComponent($event) {
    this.detail.isEdit = $event;
  }
  handleRenewLists() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.detail.branchOfficeId === this.cities[i].code) {
        this.detail.branchOfficeId = this.cities[i];
      }
    }
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.documentType === this.constants.documentTypes[i].value) {
        this.detail.documentType = this.constants.documentTypes[i];
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
        this.detail.documentExtension = this.constants.documentExtensions[i];
      }
    }
  }
  handleAccept($eventCity, $eventDocType, $eventDocExt, $eventPassport) {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if (this.detail.isEdit && ($eventDocType.value === undefined || $eventCity.value === undefined || $eventDocExt.value === undefined)) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar' + $eventDocType.value === undefined ? 'el tipo de documento' :
      $eventDocExt.value === undefined ? 'la extension del documento' : 'la sucursal de pago');
      return;
    }
    if ($eventDocType.value === 'P') {
      this.descriptionDocExt = $eventPassport;
      this.detail.documentExtension = $eventPassport;
    } else {
      this.descriptionDocExt = $eventDocExt.name;
      this.detail.documentExtension = $eventDocExt.value;
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== 'Q' && $eventDocType.value !== 'P') {
      this.descriptionDocExt = '';
      this.detail.documentExtension = '';
    }
    this.descriptionCity = $eventCity.description;
    this.detail.branchOfficeId = $eventCity.code;
    this.descriptionDocType = $eventDocType.name;
    this.detail.documentType = $eventDocType.value;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.titularName === undefined || this.detail.titularName === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Nombre del Beneficiario');
      return;
    }
    if (this.detail.documentExtension === undefined) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la extensión del Documento');
      return;
    }
    if (this.detail.documentNumber === undefined || this.detail.documentNumber.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Numero de Documento');
      return;
    }
    this.aux = this.detail.documentNumber.toString();
    if (this.aux.length < 3) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El Número de documento, debe tener mínimo 3 dígitos');
      return;
    }
    this.aux = this.detail.documentType;
    if (this.aux === 'U' || this.aux === 'W' || this.aux === 'T') {
      this.detail.documentExtension = '';
      this.descriptionDocExt = '';
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
    this.detail.paymentType = 'EFE';
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
    if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.titularName === undefined
    || this.detail.firstLastName === undefined || this.detail.secondLastName === undefined || this.detail.documentNumber === undefined) {
      this.handleDelete();
    }
    if (this.detail.branchOfficeId !== undefined && this.detail.documentExtension !== undefined &&
      this.detail.documentType !== undefined  ) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventCity, $eventDocType, $eventDocExt, $eventPassport) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.titularNameForm.form);
    this.messageService.validateAllFormFields(this.firstLastNameForm.form);
    this.messageService.validateAllFormFields(this.secondLastNameForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.instruccionsPaymentForm.form);
    this.messageService.validateAllFormFields(this.firstDetailForm.form);
    this.messageService.validateAllFormFields(this.mailForm.form);
    this.messageService.validateAllFormFields(this.documentExtensionForm.form);

    if (this.amountForm.valid && this.titularNameForm.valid && this.firstLastNameForm.valid && this.secondLastNameForm.valid && 
      this.documentNumberForm.valid && this.instruccionsPaymentForm.valid && this.firstDetailForm.valid && this.documentExtensionForm.valid && 
      (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventCity, $eventDocType, $eventDocExt, $eventPassport);
    }    
  }
}
