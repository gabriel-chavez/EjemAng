import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../../../Services/shared/enums/constants';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Telephony } from '../../../../Services/service-payments/models/telephony';
import { ServiceTypes } from '../../../../Services/shared/enums/service-types';

@Component({
  selector: 'app-telephony',
  templateUrl: './telephony.component.html',
  styleUrls: ['./telephony.component.css']
})
export class TelephonyComponent implements OnInit {

  constants: Constants;
  serviceTypes = ServiceTypes;
  data: Telephony;
  @Input() visible: boolean = false;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<Telephony>;
  @ViewChild('telephonyForm') form: NgForm;

  constructor(private globalService: GlobalService) {
    this.constants = new Constants();
    this.data = new Telephony();
    this.onChange = new EventEmitter();
  }

  ngOnInit() { 
    this.data.branchOfficeId = this.constants.branchOffices[0].value
  }

  handleValidate() {
    if(!this.visible){
      return true;
    }
    this.globalService.validateAllFormFields(this.form.form);
    if(this.form.valid){
      this.onChange.emit(this.data);
    }
    return this.form.valid;
  }

}
