import { Component, OnInit } from '@angular/core';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ChecksService } from '../../../Services/checks/checks.service';
import { CheckResult, CheckListResult } from '../../../Services/checks/models/check-result';
import { GlobalService } from '../../../Services/shared/global.service';
import { AccountResult } from '../../../Services/accounts/models/account-result';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { Roles } from '../../../Services/shared/enums/roles';
import { CheckListDto } from '../../../Services/checks/models/check-list-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../Services/shared/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
  providers: [ChecksService, UtilsService]
})

export class CheckComponent implements OnInit {

  public checks: CheckListResult = new CheckListResult();
  public accountSelected: AccountResult = new AccountResult();
  public accountRequest: AccountDto = new AccountDto();
  public informationModel: CheckListDto = new CheckListDto();

  public DateCheck: Date = new Date();
  public DateCheckStr: string;
  swTable: boolean;
  public existsImage = false;
  public stringBase64 = '';
  public aux: CheckResult = new CheckResult();
  disabledDate = moment(new Date()).add(1, 'd').toDate();
  constructor(private utilsService: UtilsService, private checksService: ChecksService, private globalService: GlobalService, private domSanitizer: DomSanitizer) {
   }

   public myDatePickerOptions: IMyDpOptions = {
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'dd/mm/yyyy',
    inline: false,
    showTodayBtn: true,
    minYear: 2000,
    maxYear: 2030,
     disableSince: { year: this.disabledDate.getFullYear(), month: this.disabledDate.getMonth() + 1, day: this.disabledDate.getDate() }
  };


  ngOnInit() {
    
    this.accountRequest = new AccountDto({
      operationTypeId: [OperationType.consultarCuentas],
      types: [String.fromCharCode(AccountTypes.passive)],
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.consultant
    });
    this.swTable = false;
  }

  handleSearch() {
    if (this.IsValid()) {
      this.listCheck(this.informationModel);
    }else {
      this.swTable = false;
    }
  }

  IsValid(): boolean {
    let flag = true;
    if (!this.informationModel.regDate) {
      flag = false;
      this.globalService.warning('Dato Incompleto', 'Ingrese fecha de cheque.');
    }
    if (!this.informationModel.accountNro) {
      flag = false;
      this.globalService.warning('Dato Incompleto', 'Ingrese número de cuenta.');
    }
    return flag;
  }

  listCheck(informationModel: CheckListDto) {
    this.checksService.getChecks(informationModel)
      .subscribe((response: CheckListResult) => {
        this.checks = response;
        this.swTable = true;
      }, error => {
        this.globalService.danger('Cheques: ', error.message);
        this.swTable = false;
        console.log(error);
      });
  }

  handleBase64Url() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.stringBase64);
  }

  handleImg($event) {
    this.aux = $event;
    this.stringBase64 = 'data:image/png;base64, ' + this.aux.checkImg;
    if (this.stringBase64 != null) {
      this.existsImage = true;
    }
  }

  getDate2Str(fecha: Date): string {
    if (fecha != null) {
    let returnDate = '';
    let diaSt = '';
    let mesSt = '';
    let today = new Date();
    today = fecha;
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear().toString();
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
      returnDate = diaSt + '/' + mesSt + '/' + yyyy;
      return returnDate;
    }
  }
  handleAccountChanged($event) {
    this.accountSelected = $event;
    this.informationModel.accountNro = this.accountSelected != null ? this.accountSelected.number : '';
  }
  handleChangeDP(event: IMyDateModel): void {
    this.DateCheck = event.jsdate;
    this.DateCheckStr = this.getDate2Str(this.DateCheck);
    this.informationModel.regDate = this.DateCheckStr;
  }
}
