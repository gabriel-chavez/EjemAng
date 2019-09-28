import { Component, OnInit } from '@angular/core';
import { DateModelPickerJ } from '../components/range-date-picker/range-date-picker.component';
import { GlobalService } from '../../../../Services/shared/global.service';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { AccountPartialModel } from '../../../../Services/historical-accounts/models/AccountPartialModel';
import { AccountUse } from '../../../../Services/shared/enums/account-use';
import { Roles } from '../../../../Services/shared/enums/roles';
import { OperationType } from '../../../../Services/shared/enums/operation-type';
import { ElectronicVoucherService } from '../../../../Services/vouchers/electronic-voucher/electronic-voucher.service';
import { GetElectronicVouchersResponse } from '../../../../Services/vouchers/electronic-voucher/models/get-electronic-vouchers-response';
import { ElectronicVoucherDto } from '../../../../Services/vouchers/electronic-voucher/models/electronic-voucher-dto';


@Component({
  selector: 'app-electronic-voucher',
  templateUrl: './electronic-voucher.component.html',
  styleUrls: ['./electronic-voucher.component.css'],
  providers: [ElectronicVoucherService]
})
export class ElectronicVoucherComponent implements OnInit {
  listElectronicVoucher: GetElectronicVouchersResponse[] = [];
  dateRange: DateModelPickerJ = new DateModelPickerJ();
  sourceAccountRequest: AccountDto = new AccountDto();
  public AccountSelected: AccountPartialModel= new AccountPartialModel();
  types: string[] = ['P'];
  swTable: boolean;
  electronicVoucherRequest: ElectronicVoucherDto = new ElectronicVoucherDto();

  constructor(private messageService: GlobalService,
      private EltVoucherService: ElectronicVoucherService) { }

  ngOnInit() {
      this.sourceAccountRequest = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.consultant,
      operationTypeId: [OperationType.consultarCuentas],
      types: this.types,
      applicationTypes: ''
    });
    this.swTable = false;
  }
  handleDateInit($event: DateModelPickerJ) {
    this.dateRange = $event;
    this.electronicVoucherRequest.dateInitial = $event.dateValue;
  }
  handleDateEnd($event: DateModelPickerJ) {
    this.dateRange = $event;
    this.electronicVoucherRequest.dateEnd = $event.dateValue;
  }
  handleGenerate() {
    if (this.IsValid()) {
        this.getListElectronicVoucher(this.electronicVoucherRequest);
    } else {
      this.swTable = false;
    }
  }
  handleSourceAccountChanged($event) {
    this.AccountSelected = $event;
    this.electronicVoucherRequest.formattedAccount = this.AccountSelected.formattedNumber;
    this.swTable = false;
  }
  IsValid(): boolean {
      let flag = true;
      if (!this.electronicVoucherRequest.dateInitial) {
        flag = false;
        this.messageService.warning('Dato Incompleto', 'Ingrese Fecha Inicial.');
      }
      if (!this.electronicVoucherRequest.dateEnd) {
        flag = false;
        this.messageService.warning('Dato Incompleto', 'Ingrese Fecha Final.');
      }
      if (!this.electronicVoucherRequest.formattedAccount) {
        flag = false;
        this.messageService.warning('Dato Incompleto', 'Eliga una cuenta.');
      }
      if (this.electronicVoucherRequest.dateInitial >  this.electronicVoucherRequest.dateEnd) {
        flag = false;
        this.messageService.warning('Fechas Incorrectas', 'La fecha inicial debe ser menor que la fecha final.');
      }
      return flag;
  }
  getListElectronicVoucher(electronicVoucherRequest: ElectronicVoucherDto) {
    this.EltVoucherService.getListElectronicVoucher(electronicVoucherRequest)
    .subscribe((response: GetElectronicVouchersResponse[]) => {
      if (response != null) {
        this.listElectronicVoucher = response;
        this.swTable = true;
      } else {
        this.messageService.warning('', 'No existen registros.');
      }
    }, (error) => this.messageService.warning('', error));
  }
}
