import { Component, OnInit, forwardRef, ViewChild, Input } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalService } from '../../../../Services/shared/global.service';
import * as moment from 'moment';
@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerComponent),
    multi: true
  }]
})
export class DateRangePickerComponent implements OnInit, ControlValueAccessor {

  dateRange: DateRangeModel = new DateRangeModel();
  dateInit: IMyDateModel = { date: null, jsdate: null, formatted: '', epoc: 0 };
  dateEnd: IMyDateModel = { date: null, jsdate: null, formatted: '', epoc: 0 };
  @Input() disabled = false;
  @Input() options: OptionsDateRange = new OptionsDateRange();
  @Input() optionsGrid: number[] = [3, 3, 3, 3];
  @ViewChild('dateRangeForm') form: NgForm;

  public optionsInit: IMyDpOptions;
  public optionsEnd: IMyDpOptions;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    const disabledDate = moment(new Date()).add(1, 'd').toDate();
    this.optionsInit = {
      editableDateField: false,
      openSelectorOnInputClick: true,
      dateFormat: 'dd/mm/yyyy',
      inline: false,
      showClearDateBtn: this.options.showClearDate,
      disableSince: this.options.isMaxDateNow
        ? { year: disabledDate.getFullYear(), month: disabledDate.getMonth() + 1, day: disabledDate.getDate() }
        : { year: 0, month: 0, day: 0 }
    };

    this.optionsEnd = {
      editableDateField: false,
      openSelectorOnInputClick: true,
      dateFormat: 'dd/mm/yyyy',
      inline: false,
      showClearDateBtn: this.options.showClearDate,
      disableSince: this.options.isMaxDateNow
        ? { year: disabledDate.getFullYear(), month: disabledDate.getMonth() + 1, day: disabledDate.getDate() }
        : { year: 0, month: 0, day: 0 }
    };
  }

  writeValue(obj: any): void {
    if (obj) {
      this.dateRange = obj;
      if (this.dateRange.dateInit) {
        this.dateInit.jsdate = this.dateRange.dateInit;
        this.dateInit.date = {
          year: this.dateRange.dateInit.getFullYear(),
          month: this.dateRange.dateInit.getMonth() + 1,
          day: this.dateRange.dateInit.getDate()
        };
        this.verifyRange();
      } else {
        this.dateInit = null;
      }
      if (this.dateRange.dateEnd) {
        this.dateEnd.jsdate = this.dateRange.dateEnd;
        this.dateEnd.date = {
          year: this.dateRange.dateEnd.getFullYear(),
          month: this.dateRange.dateEnd.getMonth() + 1,
          day: this.dateRange.dateEnd.getDate()
        };
        this.verifyRange();
      } else {
        this.dateEnd = null;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => { };

  onDateInitChanged($event: IMyDateModel) {
    this.dateRange.dateInit = $event.jsdate;
    this.verifyRange();
    this.propagateChange(this.dateRange);
  }

  onDateEndChanged($event: IMyDateModel) {
    this.dateRange.dateEnd = $event.jsdate;
    this.verifyRange();
    this.propagateChange(this.dateRange);
  }

  verifyRange() {
    const tempInitReal = moment(this.dateRange.dateInit);
    const tempEnd = moment(this.dateRange.dateEnd);
    if (tempInitReal.toDate() > tempEnd.toDate()) {
      this.dateRange.isValid = false;
      this.globalService.danger('Error de rango', `La fecha inicial, no puede ser mayor a la fecha final`);
      return false;
    }
    if (this.options.maxMonthRange) {
      let tempInit = moment(this.dateRange.dateInit).add(this.options.maxMonthRange, 'M');
      tempInit = moment(tempInit).add(1, 'd');
      if (tempEnd.isAfter(tempInit)) {
        this.dateRange.isValid = false;
        this.globalService.danger('Error de rango', `el rango de fechas debe ser menor a ${this.options.maxMonthRange} meses`);
        return false;
      }
    }
    this.dateRange.isValid = true;
    return true;
  }
}

export class DateRangeModel {
  dateInit?: Date = new Date();
  dateEnd?: Date = new Date();
  isValid?= false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class OptionsDateRange {
  isMaxDateNow?= true;
  maxMonthRange?= 3;
  isHorizontal?= true;
  showClearDate?= false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
