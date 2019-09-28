import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProvidersCheckManagementSpreadsheetsResponse } from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-response';
import { GlobalService } from '../../../../Services/shared/global.service';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { ValidateConst } from '../../../../Directives/validate-const';
import { NgForm } from '@angular/forms';
// import { request } from 'https';
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-row-list-details-providers-check-management]',
  templateUrl: './row-list-details-providers-check-management.component.html',
  styleUrls: ['./row-list-details-providers-check-management.component.css'],
  providers: [ParametersService],
})
export class RowListDetailsProvidersCheckManagementComponent implements OnInit {
  @ViewChild('amountForm') amountForm: NgForm;
  @ViewChild('beneficiaryReasonForm') beneficiaryReasonForm: NgForm;
  @ViewChild('instructionsForm') instructionsForm: NgForm;
  @ViewChild('detailForm') detailForm: NgForm;
  @ViewChild('emailProviderForm') emailProviderForm: NgForm;
  
  @Input() detail: ProvidersCheckManagementSpreadsheetsResponse;
  detailAux: ProvidersCheckManagementSpreadsheetsResponse =  new ProvidersCheckManagementSpreadsheetsResponse();
  @Output() action = new EventEmitter();
  extensions: Constants = new Constants;
  aux: any;
  isUpdateModalVisible = false;
  cityOffice: Array<any>;
  descriptionPlaceDelivery: string;
  constants: Constants = new Constants;
  constructor(private messageService: GlobalService, private parameterService: ParametersService) { }

  ngOnInit() {
    this.handleComponent(this.detail.isEdit);
    this.parameterService.getByGroup(new ParameterDto({ group: 'CODOF' }))
      .subscribe((response: ParameterResult[]) => {
        this.cityOffice = response;
        if (this.cityOffice.length > 0 && this.detail.placeDelivery === undefined) {
          this.descriptionPlaceDelivery = this.cityOffice[0].description;
          this.detail.placeDelivery = this.cityOffice[0];
        } else {
          for (let i = 0; i < this.cityOffice.length; i++) {
            if (this.detail.placeDelivery !== null && this.detail.placeDelivery.toString() === this.cityOffice[i].code) {
              this.descriptionPlaceDelivery = this.cityOffice[i].description;
            }
          }
        }
      }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
  }

  handleComponent($event) {
    this.detail.isEdit = $event;
  }

  handleRenewLists() {
    for (let i = 0; i < this.cityOffice.length; i++) {
      if (this.detail.placeDelivery === this.cityOffice[i].code || this.detail.placeDelivery === null)  {
        this.detail.placeDelivery = this.cityOffice[i];
      }
    }
  }

  handleAccept($eventCity) {
    if (+this.detail.amount === 0) {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'El monto debe ser mayor a 0');
      return;
    }
    this.descriptionPlaceDelivery = $eventCity.description;
    this.detail.placeDelivery = $eventCity.code;
    this.detail.isEdit = false;
    if (this.detail.amount === undefined || this.detail.amount.toString() === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el monto');
      return;
    }
    if (this.detail.beneficiaryReason === undefined || this.detail.beneficiaryReason === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar la Razón del Beneficiario');
      return;
    }
    if (this.detail.instructions === undefined || this.detail.instructions === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar las Instrucciones');
      return;
    }
    if (this.detail.placeDelivery === undefined || this.detail.placeDelivery === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Lugar de Entrega');
      return;
    }
    if (this.detail.detail === undefined || this.detail.detail === '') {
      this.detail.isEdit = true;
      this.handleRenewLists();
      this.messageService.warning('Error de validación:', 'Debe especificar el Detalle');
      return;
    }
    this.detail.type = 'CM';
    this.action.emit({ action: 'accept', data: this.detail });
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
    if (this.detail.amount === undefined || this.detail.beneficiaryReason === undefined
      || this.detail.instructions === undefined || this.detail.detail === undefined
      || this.detail.type === 'CA') {
      this.handleDelete();
    }
    if (this.detail.placeDelivery !== undefined) {
      this.detail.isEdit = false;
    }
    this.action.emit({ action: 'cancel', data: this.detail });
  }

  handleValidateForm($eventCity) {
    this.messageService.validateAllFormFields(this.amountForm.form);
    this.messageService.validateAllFormFields(this.beneficiaryReasonForm.form);
    this.messageService.validateAllFormFields(this.instructionsForm.form);
    this.messageService.validateAllFormFields(this.detailForm.form);

    if (this.amountForm.valid && this.beneficiaryReasonForm.valid && this.instructionsForm.valid && this.detailForm.valid &&
      (this.emailProviderForm.valid || this.detail.emailProvider === undefined || this.detail.emailProvider === '' || this.detail.emailProvider === null)) {
        this.handleAccept($eventCity);
    }
  }
}
