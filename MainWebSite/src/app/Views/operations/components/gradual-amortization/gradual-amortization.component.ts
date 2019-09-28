import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { UtilsService } from '../../../../Services/shared/utils.service';
import { DateAndDescription } from '../../../../Services/ballot-of-warranty/models/date-and-description';

@Component({
  selector: 'app-gradual-amortization',
  templateUrl: './gradual-amortization.component.html',
  styleUrls: ['./gradual-amortization.component.css'],
  providers: [UtilsService]
})
export class GradualAmortizationComponent implements OnInit {

  date: Date;
  dates: DateAndDescription = new DateAndDescription();
  @Output() action = new EventEmitter();
  public options: IMyDpOptions = {
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'dd/mm/yyyy',
    inline: false,
    disableUntil: this.utilsService.getToday()
  };
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  handleBallotOfWarrantyData() {
    this.action.emit(this.dates);
  }

  handledate($event) {
    this.dates.date = $event.jsdate;
    this.handleBallotOfWarrantyData();
  }

}
