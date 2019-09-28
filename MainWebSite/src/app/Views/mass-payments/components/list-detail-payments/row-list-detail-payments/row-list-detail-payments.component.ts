import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { PaymentTaxCheckSpreadsheetsResponse } from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-response';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-detail-payments]',
  templateUrl: './row-list-detail-payments.component.html',
  styleUrls: ['./row-list-detail-payments.component.css'],
  providers: [ParametersService],
})
export class RowListDetailPaymentsComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('socialReasonForm') socialReasonForm: NgForm;
  @ViewChild('numberTransactForm') numberTransactForm: NgForm;
  @ViewChild('documentForm') documentForm: NgForm;
  @ViewChild('addressDeliveryForm') addressDeliveryForm: NgForm;
  @ViewChild('emailForm') emailForm: NgForm;

  @Input() detail: PaymentTaxCheckSpreadsheetsResponse;
  @Output() action = new EventEmitter();
  extensions: Constants = new Constants;
  aux: any;
  isUpdateModalVisible = false;
  checks: Array<any>;
  constants: Constants = new Constants;
  descriptionDocType: string;
  descriptionDocExt: string;
  maximumDigitsAllowed = 14;
  constructor(private messageService: GlobalService) { }

  ngOnInit() {
    this.handleComponent(this.detail.isEdit);
    if (this.detail.typeDocument === undefined) {
      this.detail.typeDocument = this.constants.documentTypes[0];
    } else {
      for (let i = 0; i < this.constants.documentTypes.length; i++) {
        if (this.detail.typeDocument === this.constants.documentTypes[i].value) {
          this.descriptionDocType = this.constants.documentTypes[i].name;
        }
      }
    }
    if (this.detail.extensionDocument === undefined) {
      this.detail.extensionDocument = this.constants.documentExtensions[0];
    } else {
      for (let i = 0; i < this.constants.documentExtensions.length; i++) {
        this.detail.extensionDocument = this.detail.extensionDocument.replace(' ', Constants.EMPTY_STRING);
        if (this.detail.extensionDocument === this.constants.documentExtensions[i].value) {
          this.descriptionDocExt = this.constants.documentExtensions[i].name;
        } else {
          this.detail.extensionDocument = this.detail.extensionDocument;
        }
      }
    }
  }
  handleComponent($event) {
    this.detail.isEdit = $event;
  }

  handleRenewLists() {
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.typeDocument === this.constants.documentTypes[i].value) {
        this.detail.typeDocument = this.constants.documentTypes[i];
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      if (this.detail.extensionDocument === this.constants.documentExtensions[i].value) {
        this.detail.extensionDocument = this.constants.documentExtensions[i];
      }
    }
  }

  handleAccept($eventDocType, $eventDocExt) {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI) {
      this.descriptionDocExt = '';
      this.detail.extensionDocument = '';
    }
    this.descriptionDocType = $eventDocType.name;
    this.detail.typeDocument = $eventDocType.value;
    this.descriptionDocExt = $eventDocExt.name;
    this.detail.extensionDocument = $eventDocExt.value;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Monto');
      return;
    }
    if (this.detail.socialReason === undefined || this.detail.socialReason === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la Razón Social');
      return;
    }
    if (this.detail.numberTransact === undefined || this.detail.numberTransact.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el NÚmero de Trámite');
      return;
    }

    if (this.detail.addressDelivery === undefined || this.detail.addressDelivery === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la Dirección de Envío');
      return;
    }
    if (this.detail.document === undefined || this.detail.document.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el NÚmero de Documento');
      return;
    }
    this.aux = this.detail.document.toString();
    if (this.aux.length < 3) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El Número de documento, debe tener mínimo 3 dígitos');
      return;
    }
    this.aux = this.detail.typeDocument;
    if (this.aux === 'U' || this.aux === 'P' || this.aux === 'W' || this.aux === 'T') {
      this.detail.extensionDocument = '';
      this.descriptionDocExt = '';
    }
    if (this.detail.email !== undefined) {
      if (this.detail.email === '') {} else {
        const errorMessages = ValidateConst;
        const validateType = errorMessages.find(x => x.type === 'email');
        const isValidAccount = validateType.regex.test(this.detail.email);
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
    if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.socialReason === undefined
      || this.detail.document === undefined || this.detail.addressDelivery === undefined) {
      this.handleDelete();
    }
    if (this.detail.extensionDocument !== undefined &&
      this.detail.typeDocument !== undefined) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventDocType, $eventDocExt) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.socialReasonForm.form);
    this.messageService.validateAllFormFields(this.numberTransactForm.form);
    this.messageService.validateAllFormFields(this.documentForm.form);
    this.messageService.validateAllFormFields(this.addressDeliveryForm.form);

    if (this.amountForm.valid && this.socialReasonForm.valid && this.numberTransactForm.valid && this.documentForm.valid && 
       this.addressDeliveryForm.valid && (this.emailForm.valid || this.detail.email === undefined || this.detail.email ==='')) {
        this.handleAccept($eventDocType, $eventDocExt);
    }    
  }
}
