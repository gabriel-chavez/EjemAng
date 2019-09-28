import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { MultiplePaymentSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { MultiplePaymentsService } from '../../../../../Services/mass-payments/multiple-payments-service.service';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { AccountClientDto } from '../../../../../Services/mass-payments/Models/account-client-dto';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-payment-of-asset]',
  templateUrl: './row-list-details-payment-of-asset.component.html',
  styleUrls: ['./row-list-details-payment-of-asset.component.css'],
  providers: [MultiplePaymentsService]
})
export class RowListDetailsPaymentOfAssetComponent implements OnInit {
  @ViewChild('accountNumberForm') accountNumberForm: NgForm;
  @ViewChild('glossPaymentForm') glossPaymentForm: NgForm;
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('documentExtensionForm') documentExtensionForm: NgForm;
  @ViewChild('firstDetailForm') firstDetailForm: NgForm;
  @ViewChild('secondDetailForm') secondDetailForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;
  @ViewChild('telephoneNumberForm') telephoneNumberForm: NgForm;
  
  @Input() detail: MultiplePaymentSpreadsheetsResult;
  @Output() action = new EventEmitter();
  aux: any;
  isUpdateModalVisible = false;
  constants: Constants = new Constants;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  accountVerify = [new AccountClientDto()];
  maximumDigitsAllowed = 16;
  constructor(private messageService: GlobalService, private multiplePaymentsService: MultiplePaymentsService) { }

  ngOnInit() {
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
          this.detail.documentExtension = this.constants.documentExtensions[i].value;
          this.descriptionDocExt = this.constants.documentExtensions[i].name;
        }
      }
    }
    if (this.detail.documentType === Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = this.detail.documentExtension;
      this.documentExtensionPassport = this.detail.documentExtension;
    }
    if (this.detail.documentType === Constants.DOCUMENT_NIT) {
      this.detail.documentNumber = this.detail.documentNumber + this.detail.documentExtension;
      this.detail.documentExtension = Constants.EMPTY_STRING;
    }
  }
  handleComponent($event) {
    this.detail.isEdit = $event;
  }
  verifyAccount($event: any) {
    this.multiplePaymentsService.verifySalariesAccounts($event)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (!responseaccount[0].isOk) {
          this.detail.isEdit = true;
          this.handleRenewLists();
          this.messageService.danger('Error en validación de la cuenta:', responseaccount[0].titularAccount + ' ');
          return;
        } else {
          this.detail.titularName = responseaccount[0].titularAccount;
          this.messageService.info('El titular de la Cuenta es:', this.detail.titularName);
          this.detail.isEdit = this.detail.isFail = false;
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
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if (this.detail.isEdit && $eventDocType.value === undefined) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de documento');
      return;
    }
    if (this.detail.isEdit && $eventDocType.value === 'Q' && $eventDocExt === undefined) {
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la extensión del documento');
      return;
    }
    if ($eventDocType.value === Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = $eventPassport;
      this.detail.documentExtension = $eventPassport;
      this.accountVerify[0].documentExtension = $eventPassport;
    } else {
      this.descriptionDocExt = $eventDocExt.name;
      this.detail.documentExtension = $eventDocExt.value;
      this.accountVerify[0].documentExtension = $eventDocExt.value;
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI
      && $eventDocType.value !== Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = Constants.EMPTY_STRING;
      this.detail.documentExtension = Constants.EMPTY_STRING;
    }
    this.descriptionDocType = $eventDocType.name;
    this.detail.documentType = $eventDocType.value;
    this.accountVerify[0].documentType = $eventDocType.value;
    this.accountVerify[0].accountNumber = this.detail.accountNumber;
    this.accountVerify[0].documentNumber = this.detail.documentNumber;
    if ($eventDocType.value === Constants.DOCUMENT_FISCALID || $eventDocType.value === Constants.DOCUMENT_RUN) {
      this.accountVerify[0].documentExtension = Constants.DEFAULT_EXTENSION;
    } else if ($eventDocType.value === Constants.DOCUMENT_NIT) {
      this.accountVerify[0].documentNumber = this.detail.documentNumber.slice(0, this.detail.documentNumber.length - 3);
      this.accountVerify[0].documentExtension = this.detail.documentNumber.charAt(this.detail.documentNumber.length - 3) +
      this.detail.documentNumber.charAt(this.detail.documentNumber.length - 2) +
      this.detail.documentNumber.charAt(this.detail.documentNumber.length - 1);
    }
    this.handleFieldValidate();
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
      || this.detail.firstDetail === undefined || this.detail.glossPayment === undefined || this.detail.documentNumber === undefined) {
        this.handleDelete();
      }
    if (this.detail.documentExtension !== undefined &&
      this.detail.documentType !== undefined  ) {
      this.detail.isEdit = false;
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
    if (this.detail.glossPayment === undefined || this.detail.glossPayment === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe ingresar una glosa');
      return;
    }
    if (this.detail.accountNumber === undefined || this.detail.accountNumber === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe ingresar una cuenta destino');
      return;
    }
    if (this.detail.amount === 0) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El Monto debe ser mayor que 0');
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
    if (this.aux === Constants.DOCUMENT_RUN || this.aux === Constants.DOCUMENT_FISCALID || this.aux === Constants.DOCUMENT_NIT) {
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
    this.detail.paymentType = Constants.SALARIES_PAYMENT;
    this.verifyAccount(this.accountVerify);
  }

  handleValidateForm($eventDocType, $eventDocExt, $eventPassport) {
    this.messageService.validateAllFormFields(this.accountNumberForm.form);
    this.messageService.validateAllFormFields(this.glossPaymentForm.form);
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.documentExtensionForm.form);
    this.messageService.validateAllFormFields(this.firstDetailForm.form);
    this.messageService.validateAllFormFields(this.secondDetailForm.form);

    if (this.accountNumberForm.valid && this.glossPaymentForm.valid && this.amountForm.valid && this.documentNumberForm.valid && 
       this.documentExtensionForm.valid && this.firstDetailForm.valid && this.secondDetailForm.valid && 
       (this.telephoneNumberForm.valid || this.detail.telephoneNumber === undefined || this.detail.telephoneNumber ==='' ||
       this.detail.telephoneNumber === null) &&
       (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventDocType, $eventDocExt, $eventPassport);
    }    
  }
}
