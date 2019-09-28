import { Component, OnInit, EventEmitter, Output, Input, forwardRef, ViewChild } from '@angular/core';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { Constants } from '../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../Services/shared/global.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { DateRangeModel, OptionsDateRange } from '../../../shared/components/date-range-picker/date-range-picker.component';
import { CurrencyAndAmount } from '../../../../Services/transfers/models/currency-and-amount';
import { BallotOfWarrantyDto } from '../../../../Services/ballot-of-warranty/models/ballot-of-warranty-dto';
import { UtilsService } from '../../../../Services/shared/utils.service';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { CurrencyAndAmountComponent } from '../../../shared/components/currency-and-amount/currency-and-amount.component';

@Component({
  selector: 'app-bail-data',
  templateUrl: './bail-data.component.html',
  styleUrls: ['./bail-data.component.css'],
  providers: [ParametersService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BailDataComponent),
      multi: true
    }]
})
export class BailDataComponent implements OnInit, ControlValueAccessor {
  ballot: BallotOfWarrantyDto = new BallotOfWarrantyDto();
  isTermInDays = true;
  @Input() disabled = false;
  @ViewChild('formComponent') form: NgForm;
  @ViewChild(CurrencyAndAmountComponent) currencyAndAmount: CurrencyAndAmountComponent;
  optionsInit: IMyDpOptions;
  dateInit: IMyDateModel = { date: null, jsdate: null, formatted: '', epoc: 0 };
  dateRange: DateRangeModel = new DateRangeModel();
  optionsDateRange: OptionsDateRange = {
    isHorizontal: false,
    isMaxDateNow: true,
    maxMonthRange: 600,
    showClearDate: false
  };

  OBJECT_OTHER = 'OTR';
  @Output() action = new EventEmitter();
  requestParameter: ParameterDto = new ParameterDto();
  statusRenovation: boolean;
  responseParameter: ParameterResult[];

  constructor(private parametersService: ParametersService,
    private globalService: GlobalService,
    private utilsService: UtilsService) {
    this.requestParameter.group = Constants.OBJECT_BALLOT_OF_WARRANTY;
  }

  ngOnInit() {
    const disabledDate = moment(new Date()).add(1, 'd').toDate();
    this.optionsInit = {
      editableDateField: false,
      openSelectorOnInputClick: true,
      dateFormat: 'dd/mm/yyyy',
      inline: false,
      showClearDateBtn: false,
      // disableSince: { year: disabledDate.getFullYear(), month: disabledDate.getMonth() + 1, day: disabledDate.getDate() }
    };

    this.parametersService.getByGroup(this.requestParameter).subscribe((resp: ParameterResult[]) => {
      this.responseParameter = resp;
    }, (error) => this.globalService.danger('No se pudieron obtener los datos', error.message));

    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.ballot);
    });
  }

  onDateInitChanged($event: IMyDateModel) {
    this.ballot.startDate = $event.jsdate;
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.ballot.currency = $event.currency;
    this.ballot.amount = $event.amount;
    this.ballot.literalAmount = this.utilsService.convertToLiteral(this.ballot.amount);
    this.resetTypeWarranty();
  }

  resetTypeWarranty() {
    this.ballot.typeWarranty = null;
  }

  handleRadioStatusRenovation() {
    this.ballot.numberRenovation = null;
  }

  handleChangePickerRange() {
    this.ballot.startDate = this.dateRange.dateInit;
    this.ballot.expirationDate = this.dateRange.dateEnd;
  }

  handleTypeTerm() {
    if (this.isTermInDays) {
      this.ballot.startDate = this.dateInit.jsdate;
      this.ballot.expirationDate = null;
    } else {
      this.ballot.termInDays = null;
      this.handleChangePickerRange();
    }
  }

  handleValidate(): boolean {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid && this.currencyAndAmount.handleValidate();
  }

  writeValue(obj: BallotOfWarrantyDto): void {
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
