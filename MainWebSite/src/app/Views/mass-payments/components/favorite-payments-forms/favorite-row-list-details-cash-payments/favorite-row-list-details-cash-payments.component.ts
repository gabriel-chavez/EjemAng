import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { BranchOfficeResult } from '../../../../../Services/mass-payments/Models/branch-office-result';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-favorite-row-list-details-cash-payments]',
  templateUrl: './favorite-row-list-details-cash-payments.component.html',
  styleUrls: ['./favorite-row-list-details-cash-payments.component.css'],
  providers: [ParametersService]
})
export class FavoriteRowListDetailsCashPaymentsComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  
  @Input() detail: FavoritePaymentsSpreadsheetsResult;
  @Output() action = new EventEmitter();
  @Input() typeOfLoad: string;
  aux: any;
  isUpdateModalVisible = false;
  cities: Array<any>;
  descriptionCity: string;
  descriptionDocType: string;
  descriptionDocExt: string;
  constants: Constants = new Constants;
  isChange: boolean;
  amountAux: number;
  maximumDigitsAllowed = 14;
  constructor(private messageService: GlobalService,
    private parameterService: ParametersService) {
    this.amountAux = 0;
  }

  ngOnInit() {
    this.detail.isChecked = false;
    this.parameterService.getBranchOffices()
      .subscribe((resp: BranchOfficeResult[]) => {
        this.cities = resp;
        if (this.cities.length > 0) {
          {
            for (let i = 0; i < this.cities.length; i++) {
              if (this.detail.branchOfficeId.toString() === this.cities[i].code) {
                this.descriptionCity = this.cities[i].description;
              }
            }
          }
        }
      }, (error) => this.messageService.danger('No se pudieron Obtener las sucursales', error.message));
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
  handleChecked($eventChecked, $eventLoad) {
    if ($eventChecked === false) {
      this.detail.isChecked = true;
      this.detail.typeOfLoad = $eventLoad;
      this.action.emit({ action: 'accept', data: this.detail });
    } else {
      this.detail.isChecked = false;
      this.action.emit({ action: 'accept', data: this.detail });
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
    this.action.emit({ action: 'accept', data: this.detail });
  }
  handleEdit() {
    this.detail.isChecked = false;
    this.isChange = true;
    this.detail.isEdit = true;
    this.amountAux = this.detail.amount;
    this.action.emit({ action: 'accept', data: this.detail });
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
