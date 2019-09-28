import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-favorite-row-list-details-payment-of-asset]',
  templateUrl: './favorite-row-list-details-payment-of-asset.component.html',
  styleUrls: ['./favorite-row-list-details-payment-of-asset.component.css']
})
export class FavoriteRowListDetailsPaymentOfAssetComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  
  @Input() detail: FavoritePaymentsSpreadsheetsResult;
  @Output() action = new EventEmitter();
  @Input() typeOfLoad: string;
  aux: any;
  constants: Constants = new Constants;
  descriptionDocType: string;
  descriptionDocExt: string;
  documentExtensionPassport: string;
  isChange: boolean;
  amountAux: number;
  maximumDigitsAllowed = 14;
  constructor(private messageService: GlobalService) {
    this.amountAux = 0;
  }

  ngOnInit() {
   this.handleComponent(this.detail.isEdit);
    for (let i = 0; i < this.constants.documentTypes.length; i++) {
      if (this.detail.documentType === this.constants.documentTypes[i].value) {
        this.descriptionDocType = this.constants.documentTypes[i].name;
      }
    }
    for (let i = 0; i < this.constants.documentExtensions.length; i++) {
      this.detail.documentExtension = this.detail.documentExtension.replace(' ', Constants.EMPTY_STRING);
      if (this.detail.documentExtension === this.constants.documentExtensions[i].value) {
        this.descriptionDocExt = this.constants.documentExtensions[i].name;
      } else {
        this.detail.documentExtension = this.detail.documentExtension;
      }
   }
  }
  handleComponent($event) {
    this.detail.isEdit = $event;
  }
  handleChecked($eventChecked, $eventLoad) {
    if ($eventChecked === false) {
        this.detail.isChecked = true;
        this.detail.typeOfLoad = $eventLoad;
        this.action.emit({ action: 'accept', data: this.detail});
    } else {
      this.detail.isChecked = false;
      this.action.emit({ action: 'accept', data: this.detail});
    }
  }
  handleAccept() {
    if (+this.detail.amount === 0 ) {
      this.detail.isEdit = true;
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    this.detail.isEdit = false;
    this.amountAux = +this.detail.amount;
    if (this.amountAux === 0) {
      this.detail.isEdit = true;
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    this.isChange = false;
    this.action.emit({ action: 'accept', data: this.detail});
  }
  handleEdit() {
    this.detail.isChecked = false;
    this.isChange = true;
    this.detail.isEdit = true;
    this.amountAux = this.detail.amount;
    this.action.emit({ action: 'accept', data: this.detail});
  }

  handleCancel($event) {
    this.isChange = false;
    if ($event === this.amountAux) {
      this.detail.amount = $event;
    } else {
      this.detail.amount = this.amountAux;
    }
    this.detail.isEdit = false;
  }

  handleValidateForm() {
    this.messageService.validateAllFormFields(this.amountForm.form);

    if (this.amountForm.valid) {
        this.handleAccept();
    }    
  }
}
