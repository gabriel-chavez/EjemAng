import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { CashPaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/cash-payments/cash-payments-spreadsheets-result';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-cash-payment]',
  templateUrl: './row-list-details-cash-payment.component.html',
  styleUrls: ['./row-list-details-cash-payment.component.css'],
  providers: [ParametersService],
})
export class RowListDetailsCashPaymentComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('nameForm') nameForm: NgForm;
  @ViewChild('firstLastNameForm') firstLastNameForm: NgForm;
  @ViewChild('secondLastNameForm') secondLastNameForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('instruccionsPaymentForm') instruccionsPaymentForm: NgForm;
  @ViewChild('detailsForm') detailsForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;
  
  @Input() detail: CashPaymentsSpreadsheetsResult;
  @Output() action = new EventEmitter();
  extensions: Constants = new Constants;
  aux: any;
  isUpdateModalVisible = false;
  cities: Array<any>;
  descriptionCity: string;
  descriptionDocType: string;
  descriptionDocExt: string;
  constants: Constants = new Constants;
  detailAux: CashPaymentsSpreadsheetsResult = new CashPaymentsSpreadsheetsResult();
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
    this.detail.documentType = this.constants.documentTypesCash[0];
   } else {
    for (let i = 0; i < this.constants.documentTypesCash.length; i++) {
      if (this.detail.documentType === this.constants.documentTypesCash[i].value) {
        this.descriptionDocType = this.constants.documentTypesCash[i].name;
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
      if (this.detail.branchOfficeId.toString() === this.cities[i].code) {
        this.detail.branchOfficeId = this.cities[i];
      }
    }
    for (let i = 0; i < this.constants.documentTypesCash.length; i++) {
      if (this.detail.documentType === this.constants.documentTypesCash[i].value) {
        this.detail.documentType = this.constants.documentTypesCash[i];
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
        this.detail.documentExtension = this.constants.documentExtensions[i];
      }
    }
  }
  handleAccept($eventCity, $eventDocType, $eventDocExt) {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if (this.detail.isEdit && ($eventDocType.value === undefined || $eventCity.value === undefined || ($eventDocExt.value === undefined && $eventDocExt !== "") )) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar' + $eventDocType.value === undefined ? 'el tipo de documento' :
      $eventDocExt.value === undefined ? 'la extension del documento' : 'la sucursal de pago');
      return;
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI) {
      this.descriptionDocExt = '';
      this.detail.documentExtension = '';
    }
    this.descriptionCity = $eventCity.description;
    this.detail.branchOfficeId = $eventCity.code;
    this.descriptionDocType = $eventDocType.name;
    this.detail.documentType = $eventDocType.value;
    this.descriptionDocExt = $eventDocExt.name;
    this.detail.documentExtension = $eventDocExt.value;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.name === undefined || this.detail.name === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Nombre del Beneficiario');
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
    if (this.aux === 'U' || this.aux === 'P') {
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
    this.action.emit({ action: 'accept', data: this.detail});
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
    if (this.detail.amount === undefined && this.detail.name === undefined
      || this.detail.firstLastName === undefined && this.detail.secondLastName === undefined && this.detail.documentNumber === undefined) {
        this.handleDelete();
      }
      if (this.detail.branchOfficeId !== undefined && this.detail.documentExtension !== undefined &&
        this.detail.documentType !== undefined  ) {
        this.detail.isEdit = false;
      }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventCity, $eventDocType, $eventDocExt) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.nameForm.form);
    this.messageService.validateAllFormFields(this.firstLastNameForm.form);
    this.messageService.validateAllFormFields(this.secondLastNameForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.instruccionsPaymentForm.form);
    this.messageService.validateAllFormFields(this.detailsForm.form);

    if (this.amountForm.valid && this.nameForm.valid && this.firstLastNameForm.valid && this.secondLastNameForm.valid && 
      this.documentNumberForm.valid && this.instruccionsPaymentForm.valid && this.detailsForm.valid && 
      (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventCity, $eventDocType, $eventDocExt);
    }    
  }
}
