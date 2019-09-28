import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { SalariesPaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/salaries-payments/salaries-payments-spreadsheets-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { AccountClientDto } from '../../../../../Services/mass-payments/Models/account-client-dto';
import { SalariesPaymentsService } from '../../../../../Services/mass-payments/salaries-payments.service';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-salaries-payments]',
  templateUrl: './row-salaries-payments.component.html',
  styleUrls: ['./row-salaries-payments.component.css'],
  providers: [SalariesPaymentsService]
})
export class RowSalariesPaymentsComponent implements OnInit {
  @ViewChild('emailForm') emailForm: NgForm;
  @ViewChild('accountNumberForm') accountNumberForm: NgForm;
  @ViewChild('glossForm') glossForm: NgForm;
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('documentExtensionForm') documentExtensionForm: NgForm;
  @ViewChild('firstDetailForm') firstDetailForm: NgForm;
  @ViewChild('secondDetailForm') secondDetailForm: NgForm;
  @ViewChild('telephoneNumberForm') telephoneNumberForm: NgForm;
  
  @Input() detail: SalariesPaymentsSpreadsheetsResult;
  @Output() action = new EventEmitter();
  temporalDetail: any;
  temporalDetail2: any;
  aux: any;
  isUpdateModalVisible = false;
  constants: Constants = new Constants;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  accountVerify = [new AccountClientDto()];
  maximumDigitsAllowed = 16;
  constructor(private messageService: GlobalService, private salariesPaymentsService: SalariesPaymentsService) { }

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

  handleRenewLists() {
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.documentType === this.constants.documentTypes[i].value) {
        this.detail.documentType = this.constants.documentTypes[i];
      } else {
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
        this.detail.documentExtension = this.constants.documentExtensions[i];
      }
    }
  }
  verifyAccount($event: any) {
    this.salariesPaymentsService.verificationAccount($event)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (!responseaccount[0].isOk) {
          this.detail.isEdit = true;
          this.handleRenewLists();
          this.messageService.danger('Error en validación de la cuenta:', responseaccount[0].titularAccount + ' ');
          return;
        } else {
          this.detail.titular = responseaccount[0].titularAccount;
          this.messageService.info('El titular de la Cuenta es:', this.detail.titular);
          this.detail.isEdit = false;
          this.action.emit({ action: 'accept', data: this.detail });
        }
      }, (error) => this.messageService.danger('Fallo en la verificacion de cuentas', error));
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
    this.handleCampValidate($eventDocType.value);
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
    if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.titular === undefined
      || this.detail.firstDetail === undefined || this.detail.gloss === undefined || this.detail.documentNumber === undefined) {
      this.handleDelete();
    }
    if (this.detail.documentExtension !== undefined &&
      this.detail.documentType !== undefined) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }
  handleCampValidate($event) {
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.gloss === undefined || this.detail.gloss === '') {
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
    if (this.detail.Email !== undefined) {
      if (this.detail.Email === '') {} else {
        const errorMessages = ValidateConst;
        const validateType = errorMessages.find(x => x.type === 'email');
        const isValidAccount = validateType.regex.test(this.detail.Email);
        if (!isValidAccount) {
          this.detail.isEdit = true;
          this.handleRenewLists();
          this.messageService.warning('Error de validación:', 'Introduzca un correo válido');
          return;
        }
      }
    }
    this.verifyAccount(this.accountVerify);
  }

  handleValidateForm($eventDocType, $eventDocExt, $eventPassport) {
    this.messageService.validateAllFormFields(this.accountNumberForm.form);
    this.messageService.validateAllFormFields(this.glossForm.form);
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.documentExtensionForm.form);
    this.messageService.validateAllFormFields(this.firstDetailForm.form);
    this.messageService.validateAllFormFields(this.secondDetailForm.form);

    if (this.accountNumberForm.valid && this.glossForm.valid && this.amountForm.valid && this.documentNumberForm.valid && 
      this.documentExtensionForm.valid && this.firstDetailForm.valid && this.secondDetailForm.valid && 
      (this.telephoneNumberForm.valid || this.detail.telephoneNumber === undefined || this.detail.telephoneNumber === '') && 
      (this.emailForm.valid || this.detail.Email === undefined || this.detail.Email ==='')) {
        this.handleAccept($eventDocType, $eventDocExt, $eventPassport);
    }    
  }
}
