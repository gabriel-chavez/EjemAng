import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { VoucherOperationService } from '../../../../Services/vouchers/voucher-operation/voucher-operation.service';
import { VoucherResult } from '../../../../Services/vouchers/voucher-operation/models/voucher-result';
import { VoucherDto } from '../../../../Services/vouchers/voucher-operation/models/voucher-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { SelectedVoucher } from '../../../../Services/vouchers/voucher-operation/models/selected-voucher';
import { FilterDto } from '../../../../Services/vouchers/voucher-operation/models/filter-dto';
import { UserService } from '../../../../Services/users/user.service';
import { UserCreationId } from '../../../../Services/vouchers/voucher-operation/models/user-creation-id';
import { UtilsService } from '../../../../Services/shared/utils.service';

@Component({
  selector: 'app-list-voucher-operation',
  templateUrl: './list-voucher-operation.component.html',
  styleUrls: ['./list-voucher-operation.component.css'],
  providers: [VoucherOperationService, UtilsService]
})
export class ListVoucherOperationComponent implements OnInit {

  @Output() voucherChecked = new EventEmitter();
  @Output() listVoucherChecked = new EventEmitter();
  @Output() arrayChecked = new EventEmitter();
  @Input() message: string;
  @Input() inputValue: number;
  @Input() listDetailVoucher: VoucherResult[];

  pageItems: number = 10;
  totalVouchersAMonthAgo = 0;
  requestDto: VoucherDto = new VoucherDto();
  selectedVoucher: SelectedVoucher = new SelectedVoucher();
  downloadVoucher: boolean = true;
  /*UserInfo.Identity.GetUserId<int>()*/
  filterDto: FilterDto = new FilterDto();
  resultVoucher: VoucherResult[] = [];
  resultVoucherTotal: VoucherResult[] = [];
  requestUserId: UserCreationId = new UserCreationId();
  totalVouchers = 0;
  vouchersCheckeds: boolean[] = [];
  vouchersDetailCheckeds: boolean[] = [];
  vouchersFractionatedCheckeds: boolean[] = [];
  vouchersTextCheckeds: boolean[] = [];

  constructor(private voucherOperationService: VoucherOperationService, private messageService: GlobalService,
    private userService: UserService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.requestDto.arrayVoucher = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vouchersCheckeds = [];
    this.vouchersDetailCheckeds = [];
    this.vouchersFractionatedCheckeds = [];
    this.vouchersTextCheckeds = [];
  }

  verificationUser(detail: VoucherDto, typeVoucher: number) {
    let user = this.userService.getUserToken();
    if (detail.operationTypeId == 8) {
      this.voucherOperationService.getUserId(detail).subscribe(resp => {
        this.requestUserId.userId = resp[0].userId;
        if (this.requestUserId.userId == user.nameid) {
          if(typeVoucher === 4){
            this.getFileVoucher(detail);
          }
          else{
            this.getReportVoucher(detail, typeVoucher);
          }  
        }
        else {
          this.messageService.warning('Nota: ', 'Usted no tiene acceso al comprobante');
        }
      }, (error) => this.messageService.warning('Nota: ', 'Usted no tiene acceso al comprobante'));
    }
    else {
      if(typeVoucher === 4){
        this.getFileVoucher(detail);
      }
      else{
        this.getReportVoucher(detail, typeVoucher);
      }
    }
  }

  getReportVoucher(detail: VoucherDto, typeVoucher: number) {
    this.requestDto.numberTypeVoucher = typeVoucher;
    this.requestDto.id = detail.id;
    this.requestDto.nameOperation = detail.nameOperation;
    this.requestDto.operationTypeId = detail.operationTypeId;
    this.voucherOperationService.getReportVouchers(this.requestDto)
      .subscribe((resp: Blob) => {
        this.utilsService.donwloadReport(this.requestDto.nameOperation + '.pdf', resp);
      }, (error) => this.messageService.warning('Fallo del Servicio: ', error.message));
  }

  getFileVoucher(detail: VoucherDto) {
    this.requestDto.id = detail.id;
    this.requestDto.nameOperation = detail.nameOperation;
    this.requestDto.operationTypeId = detail.operationTypeId;

    this.voucherOperationService.getNameFileTxt(this.requestDto)
      .subscribe(response => {
        this.requestDto.txtName = response.txtName;
        this.voucherOperationService.getFileVouchers(this.requestDto)
          .subscribe((resp: Blob) => {
            this.utilsService.donwloadReport(this.requestDto.txtName + '.txt', resp);
          })
      }, (error) => this.messageService.warning('Fallo del Servicio: ', error.message));
  }

  getChecking(e, detail: VoucherDto, typeOperation: number) {
    if (e.target.checked) {

      let user = this.userService.getUserToken();
      if (detail.operationTypeId == 8) {
        this.voucherOperationService.getUserId(detail).subscribe(resp => {
          this.requestUserId.userId = resp[0].userId;
          if (this.requestUserId.userId == user.nameid) {
            this.requestDto.arrayVoucher.push({ id: detail.id, operationTypeId: detail.operationTypeId, nameOperation: detail.nameOperation, typeVoucher: typeOperation });
          }
          else {
            this.messageService.warning('Nota: ', 'Usted no tiene acceso al comprobante');
          }
        }, (error) => this.messageService.warning('Nota: ', 'Usted no tiene acceso al comprobante'));

      }
      else {
        this.requestDto.arrayVoucher.push({ id: detail.id, operationTypeId: detail.operationTypeId, nameOperation: detail.nameOperation, typeVoucher: typeOperation });
      }
    }
    if (!e.target.checked) {
      for (var i = 0; i < this.requestDto.arrayVoucher.length; i++) {
        if (this.requestDto.arrayVoucher[i].id == detail.id && this.requestDto.arrayVoucher[i].typeVoucher == typeOperation) {
          this.requestDto.arrayVoucher.splice(i, 1);
        }
      }
    }
    this.listVoucherChecked.emit(this.requestDto.arrayVoucher);
  }

}
