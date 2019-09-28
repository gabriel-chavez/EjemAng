import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { GlobalService } from '../../../../../Services/shared/global.service';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.css']
})
export class RangeDatePickerComponent implements OnInit {
  @Output() dateInitOut= new EventEmitter<DateModelPickerJ>();
  @Output() dateEndOut= new EventEmitter<DateModelPickerJ>();

  constructor(private messageService: GlobalService) { }

  dateInit: DateModelPickerJ = new DateModelPickerJ();
  dateEnd: DateModelPickerJ = new DateModelPickerJ();

  public myDatePickerOptionsIni: IMyDpOptions = {
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    showTodayBtn: true,
    showWeekNumbers: true,
    disableUntil : { year: new Date().getFullYear() - 1  , month: new Date().getMonth() + 1, day: new Date().getDate() + 1 } ,
    disableSince : { year: new Date().getFullYear() , month: new Date().getMonth() + 1 , day: new Date().getDate() + 1  }
  };

    public myDatePickerOptionsEnd: IMyDpOptions = {
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    showTodayBtn: true,
    showWeekNumbers: true,
    disableUntil : { year: new Date().getFullYear() - 1  , month: new Date().getMonth() + 1, day: new Date().getDate() + 1 } ,
    disableSince : { year: new Date().getFullYear() , month: new Date().getMonth() + 1 , day: new Date().getDate() + 1  }
  };

  ngOnInit() {
      this.dateInit.dateValueStr = '';
  }

  handleChangeDPIni(event: IMyDateModel)  {
    this.dateInit.dateValue = event.jsdate;
    this.dateInit.dateValueStr = this.getDate2Str(this.dateInit.dateValue);
    this.dateInitOut.emit(this.dateInit);
  }
  handleChangeDPEnd (event: IMyDateModel) {
    this.dateEnd.dateValue = event.jsdate;
    this.dateEnd.dateValueStr = this.getDate2Str(this.dateEnd.dateValue);
    this.dateEndOut.emit(this.dateEnd);
  }
  getDate2Str(fecha: Date): string {
    if (fecha != null) {
    let returnDate = '';
    let diaSt = '';
    let mesSt = '';
    let today = new Date();
    // split
    today = fecha;
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // because January is 0!
    const yyyy = today.getFullYear().toString();
    // Interpolation date
    if (dd < 10) {
        diaSt = `0${dd}`;
    } else {
        diaSt = `${dd}`;
    }
    if (mm < 10) {
        mesSt = `0${mm}`;
    } else {
        mesSt = `${mm}`;
    }
      returnDate = yyyy + '-' + mesSt + '-' + diaSt;
      return returnDate;
    }
  }
}

export class DateModelPickerJ {
  dateValue: Date;
  dateValueStr: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}



