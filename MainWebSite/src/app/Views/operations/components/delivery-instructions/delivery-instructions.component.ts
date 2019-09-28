import { Component, OnInit, EventEmitter, Output, Input, forwardRef, ViewChild } from '@angular/core';
import { BallotOfWarrantyService } from '../../../../Services/ballot-of-warranty/ballot-of-warranty.service';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { EmployResult } from '../../../../Services/ballot-of-warranty/models/employ-result';
import { BallotOfWarrantyDto } from '../../../../Services/ballot-of-warranty/models/ballot-of-warranty-dto';
import { ParametersResult } from '../../../../Services/ballot-of-warranty/models/parameters-result';
import { AgencyResult } from '../../../../Services/ballot-of-warranty/models/agency-result';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';

@Component({
  selector: 'app-delivery-instructions',
  templateUrl: './delivery-instructions.component.html',
  styleUrls: ['./delivery-instructions.component.css'],
  providers: [BallotOfWarrantyService, ParametersService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryInstructionsComponent),
      multi: true
    }]
})

export class DeliveryInstructionsComponent implements OnInit, ControlValueAccessor {

  ballot: BallotOfWarrantyDto = new BallotOfWarrantyDto();
  @Input() disabled = false;
  placeOfDeliveries: ParameterResult[] = [];
  agencies: AgencyResult[] = [];
  agenciesSelected: AgencyResult[] = [];
  employs: EmployResult[] = [];
  @ViewChild('formComponent') form: NgForm;

  requestParameter: ParameterDto = new ParameterDto();
  constructor(private ballotOfWarrantyService: BallotOfWarrantyService,
    private parameterService: ParametersService,
    private globalService: GlobalService) {
  }

  ngOnInit() {
    this.parameterService.getBranchOffices().subscribe((resp: ParameterResult[]) => {
      this.placeOfDeliveries = resp;
    }, (error) => this.globalService.danger('Servicio de Parametros', error.message));

    this.ballotOfWarrantyService.getParameters().subscribe((resp: ParametersResult) => {
      this.employs = resp.employes;
      this.agencies = resp.agencies;
      this.employs.forEach(x => { x.isChecked = false; });
    }, (error) => this.globalService.danger('Mensaje Servicio de Boletas', error.message));

    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.ballot);
    });
  }

  handleChangePlaceDelivery() {
    this.agenciesSelected = this.agencies.filter(x => x.branchOfficeId.toString() === this.ballot.placeOfDelivery);
  }

  handleSelectFuncionary(employeeId: string) {
    const { ballot } = this;
    let exists = false;
    for (let index = 0; index < ballot.businessOfficers.length; index++) {
      if (ballot.businessOfficers[index].employeeId === employeeId) {
        ballot.businessOfficers.splice(index, 1);
        exists = true;
        break;
      }
    }
    if (!exists) {
      this.ballot.businessOfficers.push({ employeeId: employeeId });
    }
  }

  handleValidate(): boolean {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.ballot = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => { };

}
