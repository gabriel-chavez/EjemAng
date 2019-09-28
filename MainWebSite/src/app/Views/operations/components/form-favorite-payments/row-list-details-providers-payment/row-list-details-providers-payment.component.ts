import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { StatusFavoritePayment } from '../../../../../Services/shared/enums/status-favorite-payment';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { FavoritePaymentsService } from '../../../../../Services/mass-payments/favorite-payments.service';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { AccountProviderDto } from '../../../../../Services/mass-payments/Models/account-provider-dto';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-providers-payment]',
  templateUrl: './row-list-details-providers-payment.component.html',
  styleUrls: ['./row-list-details-providers-payment.component.css'],
  providers: [FavoritePaymentsService]
})
export class RowListDetailsProvidersPaymentComponent implements OnInit {
  @ViewChild('codeForm') codeForm: NgForm;
  @ViewChild('accountNumberForm') accountNumberForm: NgForm;
  @ViewChild('glossPaymentForm') glossPaymentForm: NgForm;
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('documentExtensionForm') documentExtensionForm: NgForm;
  @ViewChild('firstDetailForm') firstDetailForm: NgForm;
  @ViewChild('secondDetailForm') secondDetailForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;  

  @Input() detail: FavoritePaymentsSpreadsheetsResult;
  detailAux: FavoritePaymentsSpreadsheetsResult = new FavoritePaymentsSpreadsheetsResult();
  @Output() action = new EventEmitter();
  aux: any;
  isUpdateModalVisible = false;
  constants: Constants = new Constants;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  accountVerify = [new AccountProviderDto()];
  maximumDigitsAllowed = 16;
  constructor(private messageService: GlobalService, private favoritePaymentsService: FavoritePaymentsService) { }

  ngOnInit() {
    this.handleComponent(this.detail.isEdit);
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
  verifyAccount($event: any) {
    this.favoritePaymentsService.verifyProvidersAccounts($event)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (!responseaccount[0].isOk) {
          this.detail.isEdit = true;
          this.handleRenewLists();
          this.messageService.danger('Error en validación de la cuenta:', responseaccount[0].titularAccount);
          return;
        } else {
          this.detail.titularName = responseaccount[0].titularAccount;
          this.messageService.info('El titular de la Cuenta es:', this.detail.titularName);
          this.detail.isEdit = false;
          this.action.emit({ action: 'accept', data: this.detail });
        }
      }, (error) => this.messageService.danger('Fallo en la verificacion de cuentas', error));
  }
  handleRenewLists() {
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
  handleAccept($eventDocType, $eventDocExt, $eventPassport) {
    if (this.detail.isEdit && $eventDocType.value === undefined) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de documento');
      return;
    }
    if (this.detail.isEdit && $eventDocType.value === Constants.DOCUMENT_CI && $eventDocExt === undefined) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la extensión del documento');
      return;
    }
    if ($eventDocType.value === Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = $eventPassport;
      this.detail.documentExtension = $eventPassport;
    } else {
      this.descriptionDocExt = $eventDocExt.name;
      this.detail.documentExtension = $eventDocExt.value;
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI
      && $eventDocType.value !== Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = Constants.EMPTY_STRING;
      this.detail.documentExtension = Constants.EMPTY_STRING;
    }
    this.descriptionDocType = $eventDocType.name;
    this.detail.documentType = $eventDocType.value;
    this.accountVerify[0].accountNumber = this.detail.accountNumber;
    this.detail.code = this.detail.code !== undefined ? this.detail.code.toUpperCase() : '';
    this.detail.glossPayment = this.detail.glossPayment !== undefined ? this.detail.glossPayment.toUpperCase() : '';
    this.detail.branchOfficeId = 0;
    this.handleFieldValidate();
  }
  handleEdit() {
    this.detailAux = Object.assign(this.detailAux, this.detail);
    this.handleRenewLists();
    this.detail.isEdit = true;
    this.action.emit({ action: 'edit', data: this.detail });
  }

  handleDelete() {
    this.isUpdateModalVisible = false;
    this.detail.isDeleted = true;
    this.action.emit({ action: 'delete', data: this.detail });
  }

  handleCancel() {
    this.detail = Object.assign(this.detail, this.detailAux);
    if (this.detail.line === this.detail.line && this.detail.amount === undefined && this.detail.titularName === undefined
      || this.detail.accountNumber === undefined && this.detail.glossPayment === undefined && this.detail.documentNumber === undefined) {
      this.handleDelete();
      return;
    }
    if (this.detail.documentType !== undefined && this.detail.documentExtension !== undefined &&
      this.detail.documentType !== undefined) {
      this.detail.isEdit = false;
    }
    if (this.detail.titularName.includes('No existe un titular para la cuenta')) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.danger('Error de validación:', 'Debe corregir el pago para obtener un titular');
      return;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }
  handleFieldValidate() {
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.accountNumber === undefined || this.detail.accountNumber === '') {
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
    this.aux = this.detail.documentType;
    if (this.aux === 'U' || this.aux === 'W' || this.aux === 'T') {
      this.detail.documentExtension = '';
      this.descriptionDocExt = '';
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
    if (this.detail.operationStatusId === StatusFavoritePayment.PROCESSED) {
      this.detail.operationStatusId = StatusFavoritePayment.EDIT_PROCESSED;
    } else {
      this.detail.operationStatusId = StatusFavoritePayment.SOLICITED;
    }
    this.detail.paymentType = Constants.PROVIDERS_PAYMENT;
    this.verifyAccount(this.accountVerify);
  }

  handleValidateForm($eventDocType, $eventDocExt, $eventPassport) {
    this.messageService.validateAllFormFields(this.codeForm.form);
    this.messageService.validateAllFormFields(this.accountNumberForm.form);
    this.messageService.validateAllFormFields(this.glossPaymentForm.form);
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.documentExtensionForm.form);
    this.messageService.validateAllFormFields(this.firstDetailForm.form);
    this.messageService.validateAllFormFields(this.secondDetailForm.form);

    if (this.codeForm.valid && this.accountNumberForm.valid && this.glossPaymentForm.valid && this.amountForm.valid && this.documentNumberForm.valid && 
       this.documentExtensionForm.valid && this.firstDetailForm.valid && this.secondDetailForm.valid && 
       (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventDocType, $eventDocExt, $eventPassport);
    }    
  }
}
