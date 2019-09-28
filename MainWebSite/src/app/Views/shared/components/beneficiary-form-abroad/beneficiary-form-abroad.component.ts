import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { ParameterDocumentTypeResult } from '../../../../Services/transfers-abroad/models/parameter-document-type-result';
import { BeneficiaryAbroadData } from '../../../../Services/transfers-abroad/models/beneficiary-abroad-data';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-beneficiary-form-abroad',
  templateUrl: './beneficiary-form-abroad.component.html',
  styleUrls: ['./beneficiary-form-abroad.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BeneficiaryFormAbroadComponent),
    multi: true
  }]
})
export class BeneficiaryFormAbroadComponent implements OnInit, ControlValueAccessor {

  beneficiary: BeneficiaryAbroadData = new BeneficiaryAbroadData();
  @Input() documentTypes: ParameterDocumentTypeResult[] = [];
  @Input() disabled = false;
  isTicketCommissionGenerate: boolean;
  @ViewChild('formBeneficiary') form: NgForm;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.beneficiary);
    });
  }

  handleValidate(): boolean {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.beneficiary = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => { };

}
