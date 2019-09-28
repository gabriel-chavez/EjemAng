import { Component, OnInit } from '@angular/core';
import { DateRangeModel, OptionsDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';
import { TrackTransfersDto } from '../../../Services/track-transfers/models/track-transfers-dto';
import { TrackTransfersResult } from '../../../Services/track-transfers/models/track-transfers-result';
import { TrackTransfersService } from '../../../Services/track-transfers/track-transfers.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { UserService } from '../../../Services/users/user.service';
import { TrackStatusResult } from '../../../Services/track-transfers/models/track-status-result';
import { OperationTypeResult } from '../../../Services/track-transfers/models/operation-type-result';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
  providers: [TrackTransfersService, UserService]
})
export class TrackingComponent implements OnInit {
  orderFlag: boolean;
  isCredentialsValidationVisible = false;
  validatePasswordInsteadToken: boolean;
  nameReport = 'Seguimiento de operaciones';
  showBatchDetail = false;
  operationType: string;
  formatSelected: string;
  dateRange?: DateRangeModel = new DateRangeModel();
  user: any;
  pageSize: number;
  public tracksDto: TrackTransfersDto = new TrackTransfersDto();
  swTable: boolean;
  public tracksResult: TrackTransfersResult[] = [];
  public tracks: TrackTransfersResult[] = [];
  public statuses: TrackStatusResult[] = [];
  public date: Date = new Date();
  statusses: any;
  defaultStatus = 0;
  companyName: string;
  loadFirstStatus: true;

  operationTypeSelected: OperationTypeResult;
  statusSelected: TrackStatusResult = new TrackStatusResult();
  beneficiarySelected: string;
  beneficiaries: string[];

  operationTypes: OperationTypeResult[] = [];

  types: any;
  defaultType = 0;

  loadFirstType: true;

  statusDto: number;
  typeDto: number;
  beneficiaryDto: string;

  optionsDateRange: OptionsDateRange = {
    isHorizontal: false,
    isMaxDateNow: true,
    maxMonthRange: 3,
    showClearDate: false
  };

  constructor(private userService: UserService, private trackTransfersService: TrackTransfersService, private globalService: GlobalService) { }

  ngOnInit() {
    this.companyName = this.userService.getUserToken().company_name;
    this.beneficiarySelected = '0';

    this.dateRange.dateEnd = null;
    this.dateRange.dateInit = null;

    this.tracksDto.OperationStatusId = 0;
    this.tracksDto.OperationTypeId = 0;
    this.tracksDto.Beneficiary = '0';
    this.tracksDto.EndDate = null;
    this.tracksDto.InitialDate = null;
    this.tracksDto.OrderByAsc = false;
    this.listTracking(this.tracksDto);

    this.getStatus();
    this.getTypes();
    this.getBeneficiaries();
    this.orderFlag = false;
  }

  getBeneficiaries() {
    this.trackTransfersService
      .getTransfersBeneficiaries()
      .subscribe((response: string[]) => {
        this.beneficiaries = response;
      }, error => {
        this.globalService.warning('Beneficiarios: ', error.message);
      });
  }
  getTypes() {
    this.trackTransfersService
      .getOperationTypes()
      .subscribe((response: OperationTypeResult[]) => {
        this.operationTypes = response;
        this.operationTypeSelected = this.operationTypes[0];
      }, error => {
        this.globalService.warning('Tipos de operación: ', error.message);
      });
  }

  getStatus() {
    this.trackTransfersService
      .getOperationStatus()
      .subscribe((resp: TrackStatusResult[]) => {
        this.statuses = resp;
        this.statusSelected = this.statuses[0];
      }, error => {
        this.globalService.warning('Estados de operación ', error.message)
      });
  }

  handleClear() {
    this.dateRange = new DateRangeModel({
      dateEnd: null,
      dateInit: null
    });
  }

  handleSearch() {
    if (this.IsValid() === 2) {
      this.listTracking(this.tracksDto);
    } else {
      this.swTable = false;
    }
  }
  listTracking(tracksDto: TrackTransfersDto) {
    this.trackTransfersService.trackingListParameters(tracksDto)
      .subscribe((response: TrackTransfersResult[]) => {
        this.tracks = response;
        this.swTable = true;
      }, error => {
        this.globalService.danger('Seguimiento: ', error.message);
        this.swTable = false;
      });
  }
  IsValid(): number {
    let flag = 0;
    if (this.dateRange.dateEnd == null && this.dateRange.dateInit == null) {
      if (this.operationTypeSelected.id === 0 && this.beneficiarySelected === '0') {
        flag = 2;
        this.tracksDto.OperationStatusId = this.statusSelected.id;
        this.tracksDto.OperationTypeId = 0;
        this.tracksDto.Beneficiary = '0';
        this.tracksDto.EndDate = null;
        this.tracksDto.InitialDate = null;
      } else {
        flag = 0;
        this.globalService.warning('Dato erroneos', 'Intr. fechas');
      }
    } else {
      if ((this.dateRange.dateEnd.getTime() - this.dateRange.dateInit.getTime()) / 1000000 < 432) {
        flag = 2;
        this.tracksDto.InitialDate = this.dateRange.dateInit;//.toLocaleDateString();
        this.tracksDto.EndDate = this.dateRange.dateEnd;//.toLocaleDateString();
        this.tracksDto.OperationStatusId = this.statusSelected.id;
        this.tracksDto.OperationTypeId = this.operationTypeSelected.id;
        this.tracksDto.Beneficiary = this.beneficiarySelected;
      } else {
        flag = 0;
        this.globalService.warning('Dato erroneos', 'La diferencia de fechas debe ser menor o igual a 5 dias');
      }
    }
    return flag;
  }

  handleChangeChecked(event: boolean) {
    this.orderFlag = event;
    this.tracksDto.OrderByAsc = event;
    this.swTable = false;
    this.trackTransfersService.trackingListParameters(this.tracksDto)
      .subscribe((response: TrackTransfersResult[]) => {
        this.tracks = response;
        this.swTable = true;
      }, error => {
        this.globalService.danger('Seguimiento: ', error.message);
        this.swTable = false;
      });

  }

}

