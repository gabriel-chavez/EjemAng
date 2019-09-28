import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/users/user.service';
import { HeaderBillDto } from '../../../Services/vouchers/electronic-bill/models/header-bill-dto';
import { ElectronicBillService } from '../../../Services/vouchers/electronic-bill/electronic-bill.service';
import { HeaderBillResult } from '../../../Services/vouchers/electronic-bill/models/header-bill-result';
import { GlobalService } from '../../../Services/shared/global.service';
import { DateRangeModel } from '../../shared/components/date-range-picker/date-range-picker.component';
import { DatePipe } from '@angular/common';
import { UtilsService } from '../../../Services/shared/utils.service';
import * as moment from 'moment';
@Component({
  selector: 'app-electronic-bill',
  templateUrl: './electronic-bill.component.html',
  styleUrls: ['./electronic-bill.component.css'],
  providers: [ElectronicBillService, DatePipe, UtilsService]
})
export class ElectronicBillComponent implements OnInit {

  titularUser: any;
  isDateOrMonths: boolean;
  isVisibleDetail: boolean;
  requestHeader: HeaderBillDto = new HeaderBillDto();
  responseHeader: HeaderBillResult[] = [];
  responseHeaderPerPage: HeaderBillResult[] = [];
  MonthDescription: string;
  totalBills: number;
  isPanelVisible: boolean;
  message: string;
  isDisabled: boolean;
  isModalVisible: boolean;
  dateRange: DateRangeModel = new DateRangeModel();
  actualEnd = new Date();
  dateInit = new Date();
  constructor(private userService: UserService, private billService: ElectronicBillService,
    private messageService: GlobalService, private datepipe: DatePipe, private utilsService: UtilsService) {
    this.isDateOrMonths = true;
    this.isVisibleDetail = false;
    this.isDisabled = true;
  }

  ngOnInit() {
    this.titularUser = this.userService.getUserToken();
    this.requestHeader.reportType = true;
    this.requestHeader.startDate = this.dateRange.dateInit = moment(new Date()).add(-3, 'M').toDate();
    this.requestHeader.endDate = this.dateRange.dateEnd = new Date();
  }

  handleGetMonths($event) {
    this.requestHeader.startDate = $event.initial;
    this.requestHeader.endDate = $event.final;
    this.MonthDescription = $event.description;
    this.isVisibleDetail = false;
    this.isPanelVisible = false;
    this.isDisabled = true;
  }

  handleDates() {
    this.requestHeader.startDate = this.dateRange.dateInit;
    this.requestHeader.endDate = this.dateRange.dateEnd;
    this.isVisibleDetail = false;
    this.isPanelVisible = false;
    this.isDisabled = this.dateRange.isValid;
  }

  ResetComponents() {
    this.isVisibleDetail = false;
    this.isDisabled = this.isDateOrMonths ? true : false;
    if (this.isDateOrMonths) {
      this.handleDates();
    }
    this.isPanelVisible = false;
  }

  SearchBill() {
    this.billService.GetListBill(this.requestHeader).subscribe(resp => {
      this.isVisibleDetail = true;
      this.responseHeader = resp;
      this.totalBills = resp.length;
      this.isPanelVisible = false;
      this.isModalVisible = this.totalBills >= 201 && !this.isDateOrMonths ? true : false;
    }, (error) => {
      this.isPanelVisible = true;
      this.message = this.isDateOrMonths ?
        'No existen facturas para el rango de fechas: ' + this.datepipe.transform(this.requestHeader.startDate, 'dd-MM-yyyy') + ' a ' + this.datepipe.transform(this.requestHeader.endDate, 'dd-MM-yyyy')
        : 'No existen facturas para el mes de: ' + this.MonthDescription.toUpperCase();
    });
  }

  handlePageChanged($event) {
    this.responseHeaderPerPage = this.responseHeader.slice((($event - 1) * 10), 10 * $event);
  }

  handleShowDetails($number: string, $code: string) {
    this.requestHeader.number = $number;
    this.requestHeader.controlCode = $code;
    this.billService.GetDetailBill(this.requestHeader).subscribe(resp => {
      this.utilsService.donwloadReport('Factura ' + $number.trim(), resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error.message));
  }

  handleDonwloadRarDetail() {
    this.billService.GetBillPerMonth(this.requestHeader).subscribe(resp => {
      this.utilsService.donwloadReport('Facturas ' + this.MonthDescription + '.rar', resp);
    }, (error) => this.messageService.danger('No se pudo generar el archivo: ', error.message));
  }

  handleExportListBill() {
    this.billService.GetListBillReport(this.requestHeader).subscribe(resp => {
      this.utilsService.donwloadReport('Facturas de ' + this.datepipe.transform(this.requestHeader.startDate, 'dd-MM-yyyy')
        + ' a ' + this.datepipe.transform(this.requestHeader.endDate, 'dd-MM-yyyy'), resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error.message));
  }

}
