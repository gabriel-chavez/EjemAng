import { Component, OnInit, Input } from '@angular/core';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import 'rxjs/add/operator/map';
import { AccountsService } from '../../../Services/accounts/accounts.service';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountResult } from '../../../Services/accounts/models/account-result';
import { CreditCardsService } from '../../../Services/credit-cards/credit-cards.service';
import { InformationMovementDepositResponseModel } from '../../../Services/movementDeposit/models/information-movement-deposit-response-model';
import { MovementDepositBasicRequestModel } from '../../../Services/movementDeposit/models/movement-deposit-basic-request-model';
import { MovementsDepositsService } from '../../../Services/movementDeposit/movements-deposits.service';
import { MonthsResult } from '../../../Services/parameters/models/months-result';
import { GlobalService } from '../../../Services/shared/global.service';
import { UserService } from '../../../Services/users/user.service';
import { DateRangeModel, OptionsDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmationTicket } from '../../../Services/movementDeposit/models/confirmation-ticket';

@Component({
  selector: 'app-identification-deposits',
  templateUrl: './identification-deposits.component.html',
  styleUrls: ['./identification-deposits.component.css'],
  providers: [MovementsDepositsService, AccountsService, CreditCardsService, UserService]
})
export class IdentificationDepositsComponent implements OnInit {

  ok: boolean;
  public val2 = false; public val3 = false; public val4 = false; public val5 = false; public val6 = false; public val7 = false;
  public currentPage;
  private selectedLink: string;
  public FormatSelected: string;
  public Type: string;
  selectedItem: any;

  public dateInit: any;
  public dateEnd: any;
  public numPag: number;
  public numFilPag: number;
  public numberRowMsg: string;
  public dateMonthYear: IMyDateModel;
  public totalItems: number;
  public destinationAccount: string;


  optionsDateRange: OptionsDateRange = {
    isMaxDateNow: true,
    maxMonthRange: 12,
    isHorizontal: false
  };

  dateRange: DateRangeModel = new DateRangeModel();

  informationModel: InformationMovementDepositResponseModel;
  list: MovementDepositBasicRequestModel[] = [];
  accounts: AccountResult[] = [];
  accountSelected: AccountResult = new AccountResult();
  typeFilter = 'optByDates';
  checkMoreDetails = false;
  requestmovements: MovementDepositBasicRequestModel = new MovementDepositBasicRequestModel();
  request: AccountDto = new AccountDto();
  isVisible = false;
  movementDepositSelected: MovementDepositBasicRequestModel = new MovementDepositBasicRequestModel();
  monthSelected: MonthsResult = new MonthsResult();
  pageSelected = 1;
  sizePage = 10;
  user: any;

  
  @Input() showModal = false;
  confirmation: ConfirmationTicket = new ConfirmationTicket();
  isVisibleConfirmation = false;
  @Input() isVisibleBtn = false;


  nameReport: 'Reporte de Identifiación de Abonos';
  constructor(private movementsDepositsService: MovementsDepositsService
    , private accountService: AccountsService
    , private CreditCardsService: CreditCardsService
    , private userService: UserService
    , private messageService: GlobalService
    , private router: Router) {
    this.selectedLink = 'opcMes';
    this.resetDatePicker();
    this.resetMonth();
  }
  ngOnInit() {
    this.getConfirmation();
    this.dateRange.dateInit = moment(new Date).add(-1, 'd').toDate();
    this.dateRange.dateEnd = moment(new Date).add(-1, 'd').toDate();

    this.request = new AccountDto(
      {
        accountUse: 'D',
        operationTypeId: [12],
        roleId: 2,
        types: ['P'],
        applicationTypes: ''
      }
    );
    this.user = this.userService.getUserToken();
    this.Type = this.FormatSelected;

    this.accountService.getAccounts(this.request)
      .subscribe(response => {
        this.accounts = response;
      });

    this.informationModel = new InformationMovementDepositResponseModel(
      {
        dateInitial: '',
        dateEnd: '',
        account: '',
        operationTypes: 0,
        numPag: this.pageSelected,
        quantityData: this.sizePage,
        type: this.Type
      }
    );
  }
  resetDatePicker() {
    this.dateRange.dateInit = moment(new Date()).add(-1, 'd').toDate();
    this.dateRange.dateEnd = moment(new Date()).add(-1, 'd').toDate();
  }
  resetMonth() {
    this.monthSelected.initial = moment(new Date()).toDate();
    this.monthSelected.final = moment(new Date()).toDate();
  }
  handleChangePage($event) {
    this.informationModel.numPag = $event;
    this.handleUpdateReport();
    this.currentPage = $event;

  }

  handleOpenModal(item) {
    this.isVisible = true;
    this.movementDepositSelected = item;
  }

  handleCloseModal() {
    this.isVisible = false;
  }

  handleUpdateReport() {
    //this.informationModel.account = '10303201000000000001040905';
    if (this.typeFilter === 'optByDates') {
      this.informationModel.dateInitial = this.dateRange.dateInit;
      this.informationModel.dateEnd = this.dateRange.dateEnd;
      this.movementsDepositsService.getTotalMovement(this.informationModel)
        .subscribe(response => {
          this.totalItems = response.total;
          if (this.totalItems === 0 && this.informationModel.account !== '') {
            this.val4 = true; this.val5 = false; this.val6 = false; this.val7 = false;
          }
        });
    } else {
      this.informationModel.dateInitial = this.monthSelected.initial;
      this.informationModel.dateEnd = this.monthSelected.final;
      this.movementsDepositsService.getTotalMovement(this.informationModel)
        .subscribe(response => {
          this.totalItems = response.total;
          if (this.totalItems === 0 && this.informationModel.account !== '') {
            this.val4 = true; this.val5 = false; this.val6 = false; this.val7 = false;
          }
        });
    }

    this.movementsDepositsService
      .getMovements(this.informationModel)
      .subscribe(res => {
        this.list = res;
      }, error => { console.log(error); });
  }

  formatDate(date: IMyDateModel) {
    const result = '';
    const year = date.date.year.toString();
    const month = date.date.month <= 9 ? '0' + date.date.month : date.date.month.toString();
    const day = date.date.day <= 9 ? '0' + date.date.day : date.date.day.toString();
    return `${year}${month}${day}`;
  }

  getLastDay(yearMonth: string): IMyDateModel {
    const monthyear = yearMonth.split('#');
    const year = +monthyear[1];
    const month = +monthyear[0];
    const date = new Date(year, month - 1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const result: any = { date: { year: year, month: month, day: lastDay.getDate() } };
    return result;
  }

  setradio(e: string) {
    this.selectedLink = e;
    switch (e) {
      case 'optFec':
        this.val2 = false; this.val3 = false; this.val4 = false; this.val5 = false; this.val6 = false; this.val7 = false; this.resetDatePicker();
        break;
      case 'optMes':
        this.val2 = true; this.val3 = false; this.val4 = false; this.val5 = false; this.val6 = false; this.val7 = false; this.informationModel.account = this.informationModel.account; this.resetMonth();
        break;
      case 'optNcu1':
        this.val3 = true; this.val5 = false; this.val6 = false; this.val7 = false;
        break;
      case 'optNcu2':
        this.val2 = true; this.val3 = true; this.val5 = false; this.val6 = false; this.val7 = false;
        break;
      case 'optAdi':
        if (this.informationModel.account === '') {
          if (this.typeFilter === 'optByDates') {
            this.messageService.danger('ERROR', 'Debe Seleccionar una Cuenta'); this.val4 = false;
          } else { if (this.typeFilter === 'optByMonths') { this.messageService.danger('ERROR', 'Debe Seleccionar una Cuenta y el Mes.'); this.val4 = false; } }
        } else { this.val4 = false; this.val5 = true; this.val6 = true; this.val7 = true; }
        break;
      case 'optAbo':
        this.val2 = false; this.val3 = false; this.val5 = false; this.val6 = false; this.val7 = false;
        this.informationModel.operationTypes = 0;
        break;
      case 'optRet':
        this.val3 = false; this.val5 = false; this.val6 = false; this.val7 = false;
        this.informationModel.operationTypes = 1;
        break;
    }
  }

  isSelected(name: string): boolean {
    if (!this.selectedLink) {
      return false;
    }
    return this.selectedLink === name;
  }

  handleGetMonths($event: MonthsResult) {
    this.monthSelected = $event;
  }
  handleChangedDrpMonth() {
  }

  handleAccountChanged($event) {
    this.accountSelected = $event;
    this.informationModel.account = this.accountSelected.number;
    if (this.accountSelected.currency === 'BOL') {
      this.accountSelected.currency = 'BOLIVIANOS';
    } else {
      if (this.accountSelected.currency === 'USD') { this.accountSelected.currency = 'DOLARES'; }
    }
    if (this.accountSelected.application === 'CTE') {
      this.accountSelected.application = 'CUENTA CORRIENTE';
    } else {
      if (this.accountSelected.application === 'AHO') { this.accountSelected.application = 'CUENTA DE AHORRO'; }
    }
  }
  reload() {
    this.router.navigate(['/queries/identification-deposits']);
    // window.location.reload(true);
  }

  getReport() {
    if (this.typeFilter === 'optByDates') {
      this.informationModel.dateInitial = this.dateRange.dateInit;
      this.informationModel.dateEnd = this.dateRange.dateEnd;
      this.informationModel.type = this.FormatSelected;
    } else {
      this.informationModel.type = this.FormatSelected;
    }

    this.movementsDepositsService.getReportMovements(this.informationModel)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte Identificación Abonos ');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Reporte Identificación Abonos ' + this.informationModel.account;
        link.click();
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error.message));
  }

  getReporte(item) {
    this.movementDepositSelected = item;
    this.movementDepositSelected.destinationAccount = this.accountSelected.formattedNumber;
    this.movementsDepositsService.getReportsMovements(this.movementDepositSelected)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte Identificación Abonos ');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Reporte Identificación Abonos ' + this.informationModel.account;
        link.click();
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error.message));
  }
  getConfirmation() {
    this.movementsDepositsService.getConfirmationTicket().subscribe(res => {
      this.confirmation = res;
      if (this.confirmation.existUser == false) {
        this.isVisibleConfirmation = true;
      }
      else {
        this.isVisibleConfirmation = false;
      }
    }, error => { console.log(error); });
  }
  handleCloseModalConfirmation() {
    this.movementsDepositsService.saveContractConfirmation().subscribe(res => {
      this.confirmation = res;
    }, error => { console.log(error); });
    this.isVisibleConfirmation = false;
      this.showModal = false;
  }
  handleConfirmation(e){
    if (e.target.checked){
      this.isVisibleBtn = true;
    }
    else{
      this.isVisibleBtn = false;
    }
  }
}
