import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../Services/shared/global.service';
import { OperationReceivedDto } from '../../../Services/transfers-abroad/models/operation-received-dto';
import { OperationReceivedResult } from '../../../Services/transfers-abroad/models/operation-received-result';
import { TransferAbroadSwiftDto } from '../../../Services/transfers-abroad/models/transfer-abroad-swift-dto';
import { TransferAbroadSwiftListResult } from '../../../Services/transfers-abroad/models/transfer-abroad-swift-result';
import { TransfersAbroadService } from '../../../Services/transfers-abroad/transfer-abroad.service';
import { DateRangeModel, OptionsDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';
import * as moment from 'moment';

@Component({
  selector: 'app-swift',
  templateUrl: './swift.component.html',
  styleUrls: ['./swift.component.css'],
  providers: [TransfersAbroadService]
})
export class SwiftComponent implements OnInit {

  dateRange: DateRangeModel = new DateRangeModel();
  transferAbroadSwiftDto: TransferAbroadSwiftDto = new TransferAbroadSwiftDto();
  operationReceivedDto: OperationReceivedDto = new OperationReceivedDto();
  swifts: TransferAbroadSwiftListResult = new TransferAbroadSwiftListResult();
  received: OperationReceivedResult[] = [];
  receivedPage: OperationReceivedResult[] = [];
  filterType = 'send';
  optionsDateRange: OptionsDateRange = {
    isHorizontal: false,
    isMaxDateNow: true,
    maxMonthRange: 3,
    showClearDate: false
  };

  pageReceivedSize = 10;

  constructor(private transfersAbroadService: TransfersAbroadService, private globalService: GlobalService) {
    this.dateRange.dateInit = moment(new Date()).add(-3, 'M').toDate();
    this.dateRange.dateEnd = new Date();
  }

  ngOnInit() {
  }

  handleSearch() {
    this.resetLists();
    const { transferAbroadSwiftDto, dateRange, transfersAbroadService } = this;
    if (this.filterType === 'send') {
      transferAbroadSwiftDto.currentPage = 0;
      transferAbroadSwiftDto.totalItems = 0;
      this.listSwift();
    } else {
      this.listReceived();
    }
  }

  handleChangePagination($event) {
    this.transferAbroadSwiftDto.currentPage = $event;
    this.listSwift();
  }

  listSwift() {
    const { transferAbroadSwiftDto, dateRange, transfersAbroadService } = this;
    transferAbroadSwiftDto.init = dateRange.dateInit;
    transferAbroadSwiftDto.end = dateRange.dateEnd;
    transfersAbroadService.getTransfersSwift(transferAbroadSwiftDto)
      .subscribe((res: TransferAbroadSwiftListResult) => {
        this.swifts = res;
        transferAbroadSwiftDto.currentPage = res.currentPage;
        transferAbroadSwiftDto.totalItems = res.totalItems;
      }, error => {
        this.globalService.danger('Error en el servicio swift', error.message);
        console.log(error);
      });
  }

  listReceived() {
    const { operationReceivedDto, dateRange, transfersAbroadService } = this;
    operationReceivedDto.init = dateRange.dateInit;
    operationReceivedDto.end = dateRange.dateEnd;
    transfersAbroadService.getOperationsReceived(operationReceivedDto)
      .subscribe((res: OperationReceivedResult[]) => {
        this.received = res;
      }, error => {
        this.globalService.danger('Error en el servicio swift', error.message);
        console.log(error);
      });
  }

  handleChangeFilter($event: string) {
    this.filterType = $event;
    this.resetLists();
  }

  handleChangePaginationReceived($event) {
    this.receivedPage = this.received.slice((($event - 1) * this.pageReceivedSize), this.pageReceivedSize * $event);
  }

  resetLists() {
    this.swifts = new TransferAbroadSwiftListResult();
    this.received = [];
  }
}

