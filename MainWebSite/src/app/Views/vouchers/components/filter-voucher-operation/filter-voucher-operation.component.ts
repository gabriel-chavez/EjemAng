import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import * as moment from 'moment';
import { VoucherOperationService } from '../../../../Services/vouchers/voucher-operation/voucher-operation.service';
import { TypeOperation } from '../../../../Services/vouchers/voucher-operation/models/type-operation';
import { VoucherDto } from '../../../../Services/vouchers/voucher-operation/models/voucher-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { FilterDto } from '../../../../Services/vouchers/voucher-operation/models/filter-dto';
import { SelectedVoucher } from '../../../../Services/vouchers/voucher-operation/models/selected-voucher';
import { DateRangeModel, OptionsDateRange } from '../../../shared/components/date-range-picker/date-range-picker.component';
import { NgLocalization } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { format } from 'url';

@Component({
  selector: 'app-filter-voucher-operation',
  templateUrl: './filter-voucher-operation.component.html',
  styleUrls: ['./filter-voucher-operation.component.css'],
  providers: [VoucherOperationService]
})
export class FilterVoucherOperationComponent implements OnInit {

  operations: TypeOperation[] = [];
  @Output() onChange = new EventEmitter<TypeOperation>();
  @Output() onChangeFilter = new EventEmitter<FilterDto>();
  @Input() returnOperations = false;
  @Input() companyAccounts = false;
  @Input() selectedOperations = 0;
  @Input() loadFirstOperation = true;
  @Input() defaultOperation = 0;
  @Input() isAwait = false;
  @Input() inputValue: number;
 
  @Input() voucherCheckedList: SelectedVoucher[] = [];
  requestDto: VoucherDto = new VoucherDto();
  selectedVoucher: SelectedVoucher = new SelectedVoucher();
  numberLot: string;
  lotInput: string;
  operationSelected: number;
  idSelected: number;
  filterDto: FilterDto = new FilterDto();
  currentDate: Date;
  formatDate: string;
  isVisible = false;
  dateRange: DateRangeModel = new DateRangeModel();
  firstDay: number = 1;
  countChecked: number = 0;

  optionsDateRange: OptionsDateRange = {
    isHorizontal: false,
    isMaxDateNow: true,
    showClearDate: false
  };

  constructor(private voucherOperationService: VoucherOperationService, private messageService: GlobalService) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.operationSelected = 0;
    this.getTypeOperation();
    this.getDateOfTheMonth(this.inputValue);
  }

  getDateOfTheMonth(inputValue) {
    let year = this.currentDate.getFullYear();
    let month = this.currentDate.getMonth() + 1;

    if (inputValue === 1) {
      this.getGenerateDate(0,1);
    }
    else if (inputValue === 2) {
      this.getGenerateDate(1,2);
    }
    else if (inputValue === 3) {
      this.getGenerateDate(2,3);
    }
    else if (inputValue === -1) {
      this.dateRange.dateInit = moment(new  Date()).add('years', -1).toDate();
      this.dateRange.dateEnd = moment(new  Date()).toDate();
    }
    else {
      this.dateRange.dateInit = moment(new  Date(year + '-' + month + '-' + this.firstDay)).toDate();
      this.dateRange.dateEnd = moment(new  Date()).toDate();
    }
  }

  getGenerateDate(valueMonth: number,valueDay: number) {
    let yearAMonth = new Date().getFullYear();
    let aMonth = new Date().getMonth() - valueMonth;
    let dayAMonth = new Date(yearAMonth, aMonth, 0);
    let dateFrom = moment(new Date()).subtract(valueDay, 'months').endOf('month').format('YYYY-MM-DD');

    this.dateRange.dateInit = moment(new  Date(yearAMonth + '-' + (aMonth) + '-' + this.firstDay)).toDate();
    this.dateRange.dateEnd = moment(dateFrom).toDate();//moment(new  Date(yearAMonth + '-' + (aMonth) + '-' + (dayAMonth.getDate()))).toDate();
  }

  getTypeOperation() {
    this.voucherOperationService.GetListTypeOperation()
      .subscribe((response: TypeOperation[]) => {
        this.operations = response;
      }, (error) => this.messageService.warning('Tipo de Operación: ', error.message));
  }

  handleTypeOperationChanged() {
    this.idSelected = this.operationSelected;
  }
  handleCaptureLotInput() {
    this.numberLot = this.lotInput;
  }

  handleSearch() {
    this.filterDto.id = parseInt(this.numberLot);
    this.numberLot = this.numberLot == undefined ? "":this.numberLot;
    if (!isNaN(this.filterDto.id)) {
      this.filterDto.arrayId = this.numberLot.split(',');
    }
    else if(this.numberLot != ""){
        this.filterDto.id = 1;
        this.filterDto.arrayId = ['00','00'];
    }
    this.filterDto.operationTypeId = this.idSelected;
    this.filterDto.dateInit = this.dateRange.dateInit;
    this.filterDto.dateEnd = this.dateRange.dateEnd;
    this.onChangeFilter.emit(this.filterDto);
  }

  handleDownloadReport() {
    this.countChecked = 0;
    this.requestDto.arrayVoucher = [];
    this.formatDate = this.currentDate.getDate().toString() + '-' + (this.currentDate.getMonth() + 1).toString() + '-' + this.currentDate.getFullYear().toString();
    
    for(var i =0; i < this.voucherCheckedList.length; i++){
      this.countChecked = this.countChecked + 1;
    }
    if (this.countChecked > 0) {
      this.requestDto.arrayVoucher = this.voucherCheckedList;
      this.currentDate = new Date();
      this.voucherOperationService.downloadReportZip(this.requestDto)
        .subscribe((resp: Blob) => {
          const data = window.URL.createObjectURL(resp);
          const link = document.createElement('a');
          link.href = data;
          link.download = 'Comprobantes_' + this.formatDate + '.zip';
          link.click();
        }, (error) => this.messageService.warning('Fallo del Servicio: ', error.message));
    }
    else {
      this.messageService.warning('Nota:', 'No existe ningún registro seleccionado.');
    }
  }

  handleCleanSearch() {
    window.location.reload();
    /*this.lotInput = '';
    this.numberLot = '';
    this.operationSelected = 0;
    this.idSelected = this.operationSelected;*/
  }
}
