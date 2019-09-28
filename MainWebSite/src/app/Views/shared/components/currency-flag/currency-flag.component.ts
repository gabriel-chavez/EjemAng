import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyFlag } from '../../../../Services/shared/models/currency-flag';
import { UtilsService } from '../../../../Services/shared/utils.service';

@Component({
  selector: 'app-currency-flag',
  templateUrl: './currency-flag.component.html',
  styleUrls: ['./currency-flag.component.css'],
  providers: [UtilsService]
})
export class CurrencyFlagComponent implements OnInit, OnChanges {

  selectedFlag: CurrencyFlag = new CurrencyFlag();
  flags: CurrencyFlag[] = [];
  @Input() flag: string;
  @Input() visible = false;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.utilsService.getCurrencyFlags()
    .subscribe(response => {
      this.flags = response.json();
      this.findFlag();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.findFlag();
  }

  findFlag() {
    this.selectedFlag = this.flags.find(x => x.currency === this.flag);
  }
}
