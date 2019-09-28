import { Component, OnInit, ViewChild, forwardRef, Input } from '@angular/core';
import { TransferAbroadFrecuent } from '../../../../Services/transfers-abroad/models/transfer-abroad-frecuent';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-frecuent-transfer-abroad-add',
  templateUrl: './frecuent-transfer-abroad-add.component.html',
  styleUrls: ['./frecuent-transfer-abroad-add.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FrecuentTransferAbroadAddComponent),
    multi: true
  }]
})
export class FrecuentTransferAbroadAddComponent implements OnInit, ControlValueAccessor {
  @Input() disabled = false;
  frecuent: TransferAbroadFrecuent = new TransferAbroadFrecuent();
  @ViewChild('frecuentTransferFormAdd') form: NgForm;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.frecuent);
    });
  }

  handleValidate() {
    this.globalService.validateAllFormFields(this.form.form);
    return (this.form.valid);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.frecuent = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => { };
}
