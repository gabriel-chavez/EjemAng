import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PaymentOddAchService } from '../../../../../Services/mass-payments/payment-odd-ach.service';
import { PaymentOddAchSpreadsheetResult } from '../../../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-spreadsheet-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { BanksResult } from '../../../../../Services/mass-payments/Models/banks-result';
import { AccountClientDto } from '../../../../../Services/mass-payments/Models/account-client-dto';
import { ValidateConst } from '../../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-payment-odd-ach]',
  templateUrl: './row-payment-odd-ach.component.html',
  styleUrls: ['./row-payment-odd-ach.component.css'],
  providers: [PaymentOddAchService]
})
export class RowPaymentOddAchComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('targetAccountForm') targetAccountForm: NgForm;
  @ViewChild('documentNumberForm') documentNumberForm: NgForm;
  @ViewChild('documentExtensionForm') documentExtensionForm: NgForm;
  @ViewChild('serviceCodeForm') serviceCodeForm: NgForm;
  @ViewChild('businessNameForm') businessNameForm: NgForm;
  @ViewChild('mailForm') mailForm: NgForm;

  @Input() detail: PaymentOddAchSpreadsheetResult;
  @Output() action = new EventEmitter();
  aux: any;
  isUpdateModalVisible = false;
  cities: Array<any>;
  typeIdc: Array<any>;
  banks: Array<any>;
  descriptionCity: string;
  descriptionBank: string;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  accountVerify = [new AccountClientDto()];
  constants: Constants = new Constants;
  maximumDigitsAllowed = 16;
  detailAux: PaymentOddAchSpreadsheetResult = new PaymentOddAchSpreadsheetResult();

  constructor(private messageService: GlobalService,
    private parameterService: ParametersService) { }

  ngOnInit() {
    this.handleComponent(this.detail.isEdit);
    if (this.detail.typeIdc === undefined) {
      this.detail.typeIdc = this.constants.documentTypes[0];
    } else {
      for (let i = 0; i < this.constants.documentTypes.length; i++) {
        if (this.detail.typeIdc === this.constants.documentTypes[i].value) {
          this.descriptionDocType = this.constants.documentTypes[i].name;
        }
      }
    }
    if (this.detail.extensionIdc === undefined) {
      this.detail.extensionIdc = this.constants.documentExtensions[0];
    } else {
      for (let i = 0; i < this.constants.documentExtensions.length; i++) {
        this.detail.extensionIdc = this.detail.extensionIdc.replace(' ', Constants.EMPTY_STRING);
        if (this.detail.extensionIdc === this.constants.documentExtensions[i].value) {
          this.detail.extensionIdc = this.constants.documentExtensions[i].value;
          this.descriptionDocExt = this.constants.documentExtensions[i].name;
        }
      }
    }



    this.parameterService.getBranchOffices()
    .subscribe((response: BranchOfficeResult[]) => {
      this.cities = response;
        if (this.cities.length > 0 && this.detail.destinationBranchOfficeId === undefined) {
         this.descriptionCity = this.cities[0].description;
         this.detail.destinationBranchOfficeId = this.cities[0];
        } else {
         for (let i = 0; i < this.cities.length; i++) {
              if (this.detail.destinationBranchOfficeId.toString() === this.cities[i].code) {
                this.descriptionCity = this.cities[i].description;
              }
          }
        }
    }, (error) => this.messageService.danger('Fallo en Servidor', error.message));

    this.parameterService.getBankList().subscribe((resp: BanksResult[]) => {
      this.banks = resp;
      if (this.banks.length > 0 && this.detail.banksAchCode ===  undefined) {
        this.descriptionBank = this.banks[0].description;
       this.detail.banksAchCode = this.banks[0];
      } else {
       for (let i = 0; i < this.banks.length; i++) {
         if (this.detail.banksAchCode === this.banks[i].code) {
           this.descriptionBank = this.banks[i].description;
        }
       }
     }
  }, (error) => this.messageService.danger('Fallo en Servidor', error.message));

  // if (this.detail.documentType === undefined) {
  //   this.detail.documentType = this.constants.documentTypesCash[0];
  //  } else {
  //   for (let i = 0; i < this.constants.documentTypes.length; i++) {
  //     if (this.detail.documentType === this.constants.documentTypes[i].value) {
  //       this.descriptionDocType = this.constants.documentTypes[i].name;
  //     }
  //   }
  //  }

  //  if (this.detail.documentExtension === undefined) {
  //   this.detail.documentExtension = this.constants.documentExtensions[0];
  //   } else {
  //   for (let i = 0; i < this.constants.documentExtensions.length; i++) {
  //     debugger;
  //       this.detail.documentExtension = this.detail.documentExtension.replace(' ', Constants.EMPTY_STRING);
  //       if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
  //         this.descriptionDocExt = this.constants.documentExtensions[i].name;
  //       } else {
  //         this.detail.documentExtension = this.detail.documentExtension;
  //       }
  //   }
  //  }

  }
  handleComponent($event) {
    this.detail.isEdit = $event;
  }

  handleRenewLists() {
    for (let i = 0; i < this.banks.length; i++) {
      if (this.detail.banksAchCode === this.banks[i].code) {
        this.detail.banksAchCode = this.banks[i];
      }
    }
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.typeIdc === this.constants.documentTypes[i].value) {
          this.detail.typeIdc =  this.constants.documentTypes[i];
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      if (this.detail.extensionIdc === this.constants.documentExtensions[i].value) {
        this.detail.extensionIdc = this.constants.documentExtensions[i];
      }
    }
    for (let i = 0; i < this.cities.length; i++) {
      if (this.detail.destinationBranchOfficeId === this.cities[i].code) {
        this.detail.destinationBranchOfficeId = this.cities[i];
      }
    }
  }
  handleAccept($eventBank, $eventCity, $eventDocType, $eventDocExt, $eventPassport)  {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    /*if (this.detail.isEdit && $eventDocExt.value === undefined) {
      this.handleRenewLists();
      // this.messageService.warning('', 'Debe especificar el tipo de documento');
      this.messageService.warning('Error de validación:', 'Debe especificar' + $eventDocType.value === undefined ? 'el tipo de documento' :
      $eventDocExt.value === undefined ? 'la extension del documento' : 'la sucursal de pago');
      return;
    }*/
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI) {
      this.descriptionDocExt = '';
      this.detail.extensionIdc = '';
    }
    if ($eventDocType.value === Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = $eventPassport;
      this.detail.extensionIdc = $eventPassport;
    }
    if ($eventDocType.value === Constants.DOCUMENT_CI) {
      this.descriptionDocExt = $eventDocExt.name;
      this.detail.extensionIdc = $eventDocExt.value;
    }
    if ($eventDocType.value === Constants.DOCUMENT_RUN || $eventDocType.value === Constants.DOCUMENT_NIT || $eventDocType.value === Constants.DOCUMENT_FISCALID) {
      this.descriptionDocExt = '';
      this.detail.extensionIdc = '';
    }
    if ($eventDocExt.name === undefined && $eventDocType.value !== Constants.DOCUMENT_CI
      && $eventDocType.value !== Constants.DOCUMENT_PASSPORT) {
      this.descriptionDocExt = Constants.EMPTY_STRING;
      this.detail.extensionIdc = Constants.EMPTY_STRING;
    }
    this.descriptionDocType = $eventDocType.name;
    this.detail.typeIdc = $eventDocType.value;
    // this.descriptionDocExt = $eventDocExt.name;
    this.detail.documentExtension = $eventDocExt.value;
    this.detail.documentType = this.descriptionDocType;
    this.descriptionCity = $eventCity.description;
    this.descriptionBank = $eventBank.description;
    this.detail.destinationBranchOfficeId = $eventCity.code;
    this.detail.banksAchCode = $eventBank.code;
    this.detail.isEdit = false;
    this.handleCampValidate();
  }

  handleCampValidate() {
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.businessName === undefined || this.detail.businessName === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Nombre de Razon Social');
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
    this.handleRenewLists();
    this.detail.isEdit = true;
    this.action.emit({ action: 'edit', data: this.detail });
  }
  handleTypeIdc(){
    if(this.detail.typeIdc.name == 'C.I.'){
      this.detail.extensionIdc = this.constants.documentExtensions[0];
    }
    else if(this.detail.typeIdc.name === 'PASAPORTE'){
      this.documentExtensionPassport = '';
    }
  }

  handleDelete() {
    this.isUpdateModalVisible = false;
    this.action.emit({ action: 'delete', data: this.detail });
  }

  handleCancel() {
    this.detail = Object.assign(this.detail, this.detailAux);
    if (this.detail.line === undefined && this.detail.amount === undefined
      || this.detail.idc === undefined && this.detail.serviceCode === undefined) {
        this.handleDelete();
      }
      if (this.detail.destinationBranchOfficeId !== undefined && this.detail.documentExtension !== undefined &&
        this.detail.documentType !== undefined  ) {
        this.detail.isEdit = false;
      }
    this.action.emit({ action: 'cancel', data: this.detail });


    // if (this.detail.line === this.detail.line || this.detail.amount === undefined || this.detail.businessName === undefined
    //    || this.detail.targetAccount === undefined) {
    //     this.handleDelete();
    //   }
    //   if (this.detail.destinationBranchOfficeId !== undefined) {
    //     this.detail.isEdit = false;
    //   }
    // this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventBank, $eventCity, $eventDocType, $eventDocExt, $eventPassport) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.targetAccountForm.form);
    this.messageService.validateAllFormFields(this.documentNumberForm.form);
    this.messageService.validateAllFormFields(this.documentExtensionForm.form);
    this.messageService.validateAllFormFields(this.serviceCodeForm.form);
    this.messageService.validateAllFormFields(this.businessNameForm.form);

    if (this.amountForm.valid && this.targetAccountForm.valid && this.documentNumberForm.valid && this.documentExtensionForm.valid &&
      this.serviceCodeForm.valid && this.businessNameForm.valid && (this.mailForm.valid || this.detail.mail === undefined || this.detail.mail ==='')) {
        this.handleAccept($eventBank, $eventCity, $eventDocType, $eventDocExt, $eventPassport);
    }
  }

}
