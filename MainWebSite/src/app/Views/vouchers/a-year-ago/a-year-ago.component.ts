import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { VoucherOperationService } from '../../../Services/vouchers/voucher-operation/voucher-operation.service';
import { VoucherResult } from '../../../Services/vouchers/voucher-operation/models/voucher-result';
import { FilterDto } from '../../../Services/vouchers/voucher-operation/models/filter-dto';
import { GlobalService } from '../../../Services/shared/global.service';
import { VoucherDto } from '../../../Services/vouchers/voucher-operation/models/voucher-dto';
import * as moment from 'moment';

@Component({
  selector: 'app-a-year-ago',
  templateUrl: './a-year-ago.component.html',
  styleUrls: ['./a-year-ago.component.css'],
  providers: [VoucherOperationService]
})
export class AYearAgoComponent implements OnInit {

  validatePasswordInsteadToken: boolean;

  @Output() voucherChecked = new EventEmitter();
  @Output() listVoucherChecked = new EventEmitter();
  pageItems: number = 10;
  totalVouchers = 0;
  listDetailVoucher: VoucherResult[] = [];
  resultVoucher: VoucherResult[] = [];
  resultVoucherTotal: VoucherResult[] = [];
  listVoucherPaginator: VoucherResult[] = [];
  isVisible = true;
  filterDto: FilterDto = new FilterDto();
  @Input() inputValue: number;
  
  countChecked: number;
  voucherCheckedList: VoucherDto[] = [];
  isPanelVisible: boolean;
  message: string;

  constructor(private voucherOperationService: VoucherOperationService, private messageService: GlobalService) { 
      this.inputValue = -1;
      this.isPanelVisible = false;
  }

  ngOnInit() {
    this.filterDto.month = this.inputValue;
    this.handleListVoucher(this.filterDto);
   }
 
   handleListVoucher(filterDto) {
     this.voucherOperationService.GetListVoucher(this.filterDto)
     .subscribe((response: VoucherResult[]) => {
       this.listDetailVoucher = response;
       this.resultVoucher = this.listDetailVoucher;
       this.resultVoucherTotal = this.listDetailVoucher;
       this.totalVouchers = response.length;
       }, (error) => this.messageService.warning('Comprobantes: ', error.message));
   }
   
   handleVoucherChanged($event: FilterDto)
   {
     for (var i =0; i < this.voucherCheckedList.length; i++){
       this.voucherCheckedList.pop();
     }
     this.voucherCheckedList.pop();
 
     this.resultVoucher = this.resultVoucherTotal;
     this.totalVouchers = this.resultVoucher.length;
     this.listDetailVoucher = this.resultVoucher.slice(0, this.pageItems);
 
     this.filterDto.id = $event.id;
     this.filterDto.operationTypeId = $event.operationTypeId;
     this.filterDto.arrayId = $event.arrayId;
     this.filterDto.dateInit = $event.dateInit;
     this.filterDto.dateEnd = $event.dateEnd;
   
     if(isNaN(this.filterDto.id)){
       this.filterDto.id = 0;
       this.filterDto.arrayId = [];
     }
     this.filterDto.operationTypeId = this.filterDto.operationTypeId == undefined ?0:this.filterDto.operationTypeId;
     if(this.filterDto.id > 0 || this.filterDto.operationTypeId > 0 && this.filterDto.dateInit != null){
       this.resultVoucher = this.resultVoucherTotal.filter(
          x => this.filterDto.arrayId.includes(x.id.toString()) || x.operationTypeId == this.filterDto.operationTypeId &&
          (moment(new Date(x.dateCreation)) >= moment(new Date(this.filterDto.dateInit)) &&
          (moment(new Date(x.dateCreation)) <= moment(new Date(this.filterDto.dateEnd)).add(1,'day'))));
       this.totalVouchers = this.resultVoucher.length;
       this.listDetailVoucher = this.resultVoucher.slice(0, this.pageItems);
     }
     if(this.filterDto.id > 0 && this.filterDto.operationTypeId > 0 && this.filterDto.dateInit != null){
       this.resultVoucher = this.resultVoucherTotal.filter(
         x => this.filterDto.arrayId.includes(x.id.toString()) && x.operationTypeId == this.filterDto.operationTypeId &&
          (moment(new Date(x.dateCreation)) >= moment(new Date(this.filterDto.dateInit)) &&
          (moment(new Date(x.dateCreation)) <= moment(new Date(this.filterDto.dateEnd)).add(1,'day'))));
       this.totalVouchers = this.resultVoucher.length;
       this.listDetailVoucher = this.resultVoucher.slice(0, this.pageItems);
     }
     if(this.filterDto.id == 0 && this.filterDto.operationTypeId == 0 && this.filterDto.dateInit != null){
       this.resultVoucher = this.resultVoucherTotal.filter(
          x =>
          (moment(new Date(x.dateCreation)) >= moment(new Date(this.filterDto.dateInit)) &&
          (moment(new Date(x.dateCreation)) <= moment(new Date(this.filterDto.dateEnd)).add(1,'day'))));
       this.totalVouchers = this.resultVoucher.length;
       this.listDetailVoucher = this.resultVoucher.slice(0, this.pageItems);
     }
     if(this.totalVouchers > 0){
      this.isPanelVisible = false;
    }
    else{
      this.isPanelVisible = true;
      this.message = 'No existe ningún registro.';
      this.messageService.warning('No existe ningún registro según los parámetros de búsqueda.', '');
    }
   }

  handlePageChanged($event: number) {
    for (var i =0; i < this.voucherCheckedList.length; i++){
      this.voucherCheckedList.pop();
    }
    this.listDetailVoucher = this.resultVoucher.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  handleListChecked($event){
    this.voucherCheckedList = $event;
  }
}
