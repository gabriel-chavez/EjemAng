import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { BallotOfWarrantyService } from '../../../../Services/ballot-of-warranty/ballot-of-warranty.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { BallotOfWarrantyDto } from '../../../../Services/ballot-of-warranty/models/ballot-of-warranty-dto';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-securing-data',
  templateUrl: './securing-data.component.html',
  styleUrls: ['./securing-data.component.css'],
  providers: [BallotOfWarrantyService, ParametersService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecuringDataComponent),
      multi: true
    }]
})
export class SecuringDataComponent implements OnInit, ControlValueAccessor {
  [x: string]: any;
  ballot: BallotOfWarrantyDto = new BallotOfWarrantyDto();
  constants: Constants = new Constants;
  @Input() disabled = false;
  requestParameter: ParameterDto = new ParameterDto();
  civilStates: ParameterResult[];
  @ViewChild('formComponent') form: NgForm;

  constructor(private messageService: GlobalService,
    private parameterService: ParametersService) {
    this.requestParameter.group = Constants.CIVIL_STATE;
  }

  ngOnInit() {
    this.parameterService.getByGroup(this.requestParameter).subscribe((resp: ParameterResult[]) => {
      this.civilStates = resp;
    }, (error) => this.messageService.danger('No se pudieron obtener los datos de estado civil', error.message));

    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.ballot);
    });
  }

  handlePersonTypeChanged() {
    this.ballot.civilState = null;
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
