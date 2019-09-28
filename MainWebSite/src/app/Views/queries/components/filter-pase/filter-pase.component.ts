import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ConsultorsPaseService } from '../../../../Services/pase/consultors-pase.service';
import { RequestModelPaseAccount } from '../../../../Services/pase/Models/Request-model-pase';
import { ResponseModelPaseAccount } from '../../../../Services/pase/Models/response-model-pase';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestModelPaseDetail } from '../../../../Services/pase/Models/Request-model-pase';
import { RequestModelHeadPase } from '../../../../Services/pase/Models/Request-model-pase';
import { ResponseModelDate } from '../../../../Services/pase/Models/response-model-date';
import { GlobalService } from '../../../../Services/shared/global.service'
import { UserService } from '../../../../Services/users/user.service';
import { ResponseModelPaseHead } from '../../../../Services/pase/Models/ResponseModelPaseHead';

@Component({
  selector: 'app-filter-pase',
  templateUrl: './filter-pase.component.html',
  styleUrls: ['./filter-pase.component.css'],
  providers: [ConsultorsPaseService]
})

export class FilterPaseComponent implements OnInit {

  public val1 = true;
  public val2 = false;
  private selectedLink: string;
  public AcountSelected: ResponseModelPaseAccount;
  public MonthSelected: ResponseModelDate = new ResponseModelDate();
  ResponseModelDate: ResponseModelDate[];
  public ok: boolean;
  public DateIniHead: Date = new Date();
  public DateEndHead: Date = new Date();
  public RequestModelPaseDetail: RequestModelPaseDetail = new RequestModelPaseDetail();
  public RequestModelHeadPase: RequestModelHeadPase = new RequestModelHeadPase();
  public DateIniHeadStr: string = "";
  public DateEndHeadStr: string = "";
  public myDatePickerIni: IMyDpOptions = {
    // other options...
    editableDateField: false,
    openSelectorOnInputClick: true,
    // dateFormat: 'dd/mm/yyyy',
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    showTodayBtn: true,
    minYear: 2000,
    maxYear: 2030,
    showWeekNumbers: true
  };
  public myDatePickerEnd: IMyDpOptions = {
    // other options...
    editableDateField: false,
    openSelectorOnInputClick: true,
    // dateFormat: 'dd/mm/yyyy',
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    showTodayBtn: true,
    minYear: 2000,
    maxYear: 2030,
    showWeekNumbers: true
  };
  loading: boolean = false;
  public modelDate: Date = new Date();
  public Interval: number = 0;
  public Month: number = 3;
  public NameCompany: string;
  public RequestModelPaseAccount: RequestModelPaseAccount = new RequestModelPaseAccount();
  public ResponseModelAccount: ResponseModelPaseAccount[] = [];
  public ResponseModelPaseHead: ResponseModelPaseHead[] = [];
  currentUser: any;
  constructor(private _ConsultorsPaseService: ConsultorsPaseService,
    private _route: ActivatedRoute,
    private _router: Router,
    private messageService: GlobalService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.currentUser = this.userService.getUserToken();
    this.NameCompany = this.currentUser.company_name;
    this.getMonth();
    this.RequestModelPaseAccount.ClientId = this.currentUser.nameid;
    this.RequestModelPaseAccount.OperationId = 12;
    this.RequestModelPaseAccount.RoleId = "2";
    this.getListAccount(this.RequestModelPaseAccount)

  };

  getMonth() {
    this._ConsultorsPaseService
      .getMonth()
      .subscribe((resp: ResponseModelDate[]) => {
        this.ResponseModelDate = resp;
        this.MonthSelected = this.ResponseModelDate[0];
      }, (error) => this.messageService.danger('El servicio no esta disponible ', error));
  }

  ShowDetail() {
    //this.loading = true;
    //this.messageService.showLoader(false);

    if (this.DateIniHeadStr != "" && this.DateEndHeadStr != "") {
      if (this.DateIniHeadStr > this.DateEndHeadStr) {
        this.messageService.danger("Mensaje de Alerta: ", "La fecha inicial no puede ser mayor que la fecha final ");

      }
      else {
        if (this.val2 === false) {
          this.Interval = (Date.UTC(this.DateEndHead.getFullYear(), this.DateEndHead.getMonth(), this.DateEndHead.getDate()) - Date.UTC(this.DateIniHead.getFullYear(), this.DateIniHead.getMonth(), this.DateIniHead.getDate())) / 86400000;
          this.Interval = Math.round(this.Interval / 30);
        }
        else {
          this.Interval = 0;
        }
        if (this.Interval < this.Month) {

          this.loading = true;
          this.RequestModelHeadPase = {
            'CodeService': this.AcountSelected.numberAccount,
            'DatesInicial': this.DateIniHeadStr,
            'DatesEnd': this.DateEndHeadStr
          };

          this._ConsultorsPaseService
            .getDetailHeadPase(this.RequestModelHeadPase)
            .subscribe((resp: ResponseModelPaseHead[]) => {
              this.ResponseModelPaseHead = resp;
              if (this.ResponseModelPaseHead.length > 0) {
                this._router.navigate(['queries/detail-pase'], { queryParams: { DateIniHeadStr: this.DateIniHeadStr, DateEndHeadStr: this.DateEndHeadStr, numberAccount: this.AcountSelected.numberAccount }, skipLocationChange: true });
                //this._router.navigate(['queries/detail-pase',this.DateIniHeadStr,this.DateEndHeadStr,this.AcountSelected.numberAccount]);
              }
              else {
                this.messageService.danger("Mensaje de Alerta: ", "No se encontraron elementos ");
              }
            }, (error) => this.messageService.danger('Mensaje de Alerta: ', error));

          this.loading = false;
        }
        else {
          this.messageService.danger("Mensaje de Alerta: ", "Solo se puede obtener reportes de los ultimos " + this.Month + " meses ");
        }
      }
    }
    else {
      this.messageService.danger("Mensaje de Alerta: ", "Por favor seleccione las fechas");
    }

    //this.loading=false;
    //this.messageService.showLoader(true);
  }
  getListAccount(RequestModelPaseAccount: RequestModelPaseAccount) {
    this._ConsultorsPaseService
      .getAccountRoles(RequestModelPaseAccount)
      .subscribe((resp: ResponseModelPaseAccount[]) => {
        this.ResponseModelAccount = resp;

        //if (ResponseModelAccount === true) {
        //this.ResponseModelAccount = respon.json().body;
        //this.ok = respon.ok;
        if (this.ResponseModelAccount.length > 0) {
          this.AcountSelected = this.ResponseModelAccount[0]
        }
        else {
          //this.messageService.showLoader(true);
          this.messageService.danger("Mensaje de Alerta: ", "La empresa no tiene cuentas asociadas. ");

          //this.messageService.showLoader(false);
        }
      }, (error) => this.messageService.danger('El servicio no esta disponible para obtener cuenta', error));
  }

  handleChangedDrpMonth() {
    this.DateIniHeadStr = this.MonthSelected.dateIni;
    this.DateEndHeadStr = this.MonthSelected.dateEnd;
  }

  handleChangeDPIni(event: IMyDateModel): void {
    this.DateIniHead = event.jsdate;
    this.DateIniHeadStr = this.getDate2Str(this.DateIniHead);

  }
  handleChangeDPEnd(event: IMyDateModel): void {
    this.DateEndHead = event.jsdate;
    this.DateEndHeadStr = this.getDate2Str(this.DateEndHead);
  }

  setradio(e: string): void {
    this.selectedLink = e;
    switch (e) {
      case 'optFec':
        this.val1 = true;
        this.val2 = false;
        break;
      case 'optMes':
        this.val1 = false;
        this.val2 = true;
        break;
    }
  }

  getDate2Str(fecha: Date): string {
    if (fecha != null) { // return string
      let returnDate = '';
      let diaSt = '';
      let mesSt = '';
      // get datetime now
      let today = new Date();
      // split
      today = fecha;
      const dd = today.getDate();
      const mm = today.getMonth() + 1; // because January is 0!
      const yyyy = today.getFullYear().toString();
      // Interpolation date
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
      returnDate = yyyy + mesSt + diaSt;
      return returnDate;
    }
  }

}
