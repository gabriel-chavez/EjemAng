import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MovAccountsModel } from '../../../Services/historical-accounts/models/MovAccountsModel';
import { MovAccountsDto } from '../../../Services/historical-accounts/models/MovAccountsDto';
import { IMyDateModel } from 'mydatepicker';
import { HistoricalAccountsService } from '../../../Services/historical-accounts/historical-accounts.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { NumberRowModel } from '../../../Services/historical-accounts/models/NumberRowModel';
import { NumberRowAccount } from '../../../Services/historical-accounts/models/NumberRowAccountModel';
import { debug } from 'util';
import { Router } from '@angular/router';
import { AccountPartialModel } from '../../../Services/historical-accounts/models/AccountPartialModel';


@Component({
  selector: 'app-historical-accounts',
  templateUrl: './historical-accounts.component.html',
  styleUrls: ['./historical-accounts.component.css'],
  providers: [HistoricalAccountsService]
})
export class HistoricalAccountsComponent implements OnInit, OnChanges {

  dateInitMain: Date = new Date;
  dateEndMain: Date = new Date;

  miModel: MovAccountsDto = new MovAccountsDto();
  public vector: number[] = [];
  public vectorListAccountMovement: MovAccountsModel[] = [];
  public swButton = false;
  public resultRow: NumberRowModel = new NumberRowModel();
  public dataIniAccountNumber: NumberRowAccount = new NumberRowAccount();
  public isVisiblePanelBody: boolean;
  valueGlobal = false;
  detailAccountSource: AccountPartialModel = new AccountPartialModel();

  constructor(private _HistoricalAccountsService: HistoricalAccountsService,
    private messageService: GlobalService, private  _router: Router) {
    this.isVisiblePanelBody = false;
  }

  ngOnInit() {
    this.valueGlobal = false;
  }

  ngOnChanges() {

  }

  handleChangeInit($event: IMyDateModel) {
    this.dateInitMain = $event.jsdate;
  }
  handleChangeEnd($event: IMyDateModel) {
    this.dateEndMain = $event.jsdate;
  }
  handlePasaParametro($event: number[]) {
    this.vector = $event;
  }
  handlePasaParametroTwo($event: MovAccountsModel[]) {
    this.vectorListAccountMovement = $event;
  }
  handlePressButton($event: boolean) {
    this.swButton = $event;
  }
  handleValidBody($event: boolean) {

  }

  inDataMovementAccount($event: MovAccountsDto) {
    this.miModel = $event;
    // if (this.miModel.NumberRow > 0) {

    // }
  }
  handlePanelBody($event: boolean) {
    this.isVisiblePanelBody = $event;
  }
  handlevalueGlobal($event) {
    this.valueGlobal = $event;
  }
  inAccountSourceDetail($event: AccountPartialModel) {
    this.detailAccountSource = $event;
  }

}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
