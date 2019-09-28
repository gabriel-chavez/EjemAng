import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RuatDto } from '../../../../Services/ruat/models/ruat-dto';
import { Constants } from '../../../../Services/shared/enums/constants';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { NgForm } from '@angular/forms';
import { RuatService } from '../../../../Services/ruat/ruat.service';
import { VehicleDebtResult } from '../../../../Services/ruat/models/vehicle-debt-result';
import { PropertyDebtResult } from '../../../../Services/ruat/models/property-debt-result';

@Component({
  selector: 'app-ruat-request-form',
  templateUrl: './ruat-request-form.component.html',
  styleUrls: ['./ruat-request-form.component.css'],
  providers: [RuatService]
})
export class RuatRequestFormComponent implements OnInit, OnChanges {

  criterias: ParameterResult[];
  cityHalls: ParameterResult[];
  documentTypes: ParameterResult[];
  documentExtensions: any[] = Constants.ruatDocumentExtensions;
  data: RuatDto;
  vehicleDebt: VehicleDebtResult;
  propertyDebt: PropertyDebtResult;
  identifierTitle: string;
  isVehicleService: boolean;
  @Input() disabled: boolean;
  @Input() serviceType: string;
  @ViewChild('ruatRequestForm') form: NgForm;

  constructor(private parametersService: ParametersService,
    private globalService: GlobalService,
    private ruatService: RuatService) {
    this.data = new RuatDto();
  }

  ngOnInit() {
    this.getParameters();
    this.data.documentExtension = this.documentExtensions[0].value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.serviceType !== undefined) {
      this.restartForm();
      switch (this.serviceType) {
        case Constants.ruatVehicles:
          this.isVehicleService = true;
          this.identifierTitle = 'Número PTA';
          break;
        case Constants.ruatProperties:
          this.isVehicleService = false;
          this.identifierTitle = this.data.criteria == '1' ? 'Número de inmueble' : 'Código catastral';
          break;
      }
    }
  }

  handleCriteriaListChanged() {
    this.identifierTitle = this.data.criteria == '1' ? 'Número de inmueble' : 'Código catastral';
  }

  handleValidate() {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid;
  }

  getVehicleDebt() {
    this.ruatService.getVehicleDebt(this.data)
      .subscribe(response => this.vehicleDebt = response, error => this.globalService.danger("Servicio RUAT", error, true));
  }

  getPropertyDebt() {
    this.ruatService.getPropertyDebt(this.data)
      .subscribe(response => this.propertyDebt = response, error => this.globalService.danger("Servicio RUAT", error, true));
  }

  restartForm() {
    this.data.identifier = '';
    this.data.documentNumber = '';
    this.vehicleDebt = undefined;
    this.propertyDebt = undefined;
  }

  restartParameters() {
    this.data.cityHallCode = this.cityHalls[0].value;
    this.data.criteria = this.criterias[0].value;
    this.data.documentType = this.documentTypes[0].value;
    this.data.documentExtension = this.documentExtensions[0].value;
  }

  newSearch() {
    this.restartForm();
    this.restartParameters();
  }

  getParameters() {
    this.parametersService.getByGroup(new ParameterDto({ group: 'RUATAL' }))
      .subscribe(response => {
        this.cityHalls = response;
        this.data.cityHallCode = this.cityHalls[0].value;
      }, error => this.globalService.danger("Parámetros", error));

    this.parametersService.getByGroup(new ParameterDto({ group: 'RUATCR' }))
      .subscribe(response => {
        this.criterias = response;
        this.data.criteria = this.criterias[0].value;
      }, error => this.globalService.danger("Parámetros", error));

    this.parametersService.getByGroup(new ParameterDto({ group: 'RUATD' }))
      .subscribe(response => {
        this.documentTypes = response;
        this.data.documentType = this.documentTypes[0].value;
      }, error => this.globalService.danger("Parámetros", error));
  }
}
