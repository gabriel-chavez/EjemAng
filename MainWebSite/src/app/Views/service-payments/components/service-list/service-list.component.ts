import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { GetDebtRequest } from '../../../../Services/service-payments/models/get-debt-request';
import { Constants } from '../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../Services/shared/global.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  selectedService: GetDebtRequest;
  services: any[];
  columnWidthForLabel: number = 2;
  @Output() onChange: EventEmitter<GetDebtRequest>;
  @Input() disabled: boolean;
  @Input() serviceType: string;
  @Input() isFirstSelected = false;
  @ViewChild('serviceListForm') form: NgForm;

  constructor(private globalService: GlobalService) {
    this.selectedService = null;
    this.onChange = new EventEmitter();
  }

  ngOnInit() {
    switch (this.serviceType) {
      case Constants.serviceRUAT:
        this.services = Constants.ruatServices;
        this.columnWidthForLabel = 3;
        break;
      case Constants.serviceAFP: break;
      default:
        this.services = Constants.basicServices;
        break;
    }
    if (this.isFirstSelected) {
      this.selectedService = this.services[0];
      this.onChange.emit(this.selectedService);
    }
  }

  handleServiceListChanged() {
    this.onChange.emit(this.selectedService);
  }

  handleValidate() {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid;
  }

}
