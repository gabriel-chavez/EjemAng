import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConsultorsPaseService } from '../../../../Services/pase/consultors-pase.service';
import { RequestModelPaseAccount } from '../../../../Services/pase/Models/Request-model-pase';
import { RequestModelPaseDetail } from '../../../../Services/pase/Models/Request-model-pase';
import { ResponseModelPaseDetail } from '../../../../Services/pase/Models/ResponseModelPaseDetail';
import { RequestModelHeadPase } from '../../../../Services/pase/Models/Request-model-pase';
import 'rxjs/add/operator/map';
import { ResponseModelPaseHead } from '../../../../Services/pase/Models/ResponseModelPaseHead';
import { RequestModelReportsPase } from '../../../../Services/pase/Models/Request-model-pase';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UserService } from '../../../../Services/users/user.service';
import { FormatSelectFile } from '../../../../Services/pase/Models/Request-model-pase';

@Component({
  selector: 'app-list-pase',
  templateUrl: './list-pase.component.html',
  styleUrls: ['./list-pase.component.css'],
  providers: [ConsultorsPaseService]
})
export class ListPaseComponent implements OnInit {

  loading = true;
  @Input() request: RequestModelHeadPase;
  public RequestModelPaseDetail: RequestModelPaseDetail = new RequestModelPaseDetail();
  public RequestModelReportsPase: RequestModelReportsPase = new RequestModelReportsPase();

  public ResponseModelPase: ResponseModelPaseDetail[] = [];
  public ResponseModelPaseHead: ResponseModelPaseHead[] = [];
  public ResponseModelPaseHeadObj: ResponseModelPaseHead = new ResponseModelPaseHead();
  public FormatSelected: string;
  public ok: boolean;
  public Type: string;
  quantity: number;
  public dateIni: string;
  public dateEnd: string;
  public CodeServ: string;
  public DateNow: Date;
  public date: string;

  currentUser: any;

  constructor(private _ConsultorsServicePase: ConsultorsPaseService,
    private _route: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.currentUser = this.userService.getUserToken();
    this.quantity = 1;
    this.FormatSelected = 'xls';
  }

  back() {
    this._router.navigate(['queries/pase']);
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
  export() {
    this.Type = this.FormatSelected;
    this.RequestModelReportsPase = {
      'CodeService': this.CodeServ,
      'DatesInicial': this.dateIni,
      'DatesEnd': this.dateEnd,
      'type': this.Type
    };

    this.DateNow = new Date;

    this._ConsultorsServicePase
      .getReportsPase(this.RequestModelReportsPase)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          if (this.Type === 'xls') {
            return navigator.msSaveOrOpenBlob(resp, 'Reporte de Recaudacion.xls');
          }
          if (this.Type === 'sap') {
            return navigator.msSaveOrOpenBlob(resp, 'CON' + this.getDate2Str(this.DateNow) + 'G.PRN');
          }
          if (this.Type === 'pdf') {
            return navigator.msSaveOrOpenBlob(resp, 'Reporte de Recaudacion.pdf');
          }
          if (this.Type === 'sap-D') {
            return navigator.msSaveOrOpenBlob(resp, 'CON' + this.getDate2Str(this.DateNow) + 'D.PRN');

          }
          if (this.Type === 'txt') {
            return navigator.msSaveOrOpenBlob(resp, this.CodeServ.substring(3, 6) + this.getDate2Str(this.DateNow).substring(2, 8) + this.CodeServ.substring(0, 3) + ".txt");
          }
          //return navigator.msSaveOrOpenBlob(resp, 'Reporte de Recaudacion');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        if (this.Type === 'xls') {
          link.download = 'Reporte de Recaudacion.xls';
        }
        if (this.Type === 'sap') {
          link.download = 'CON' + this.getDate2Str(this.DateNow) + 'G.PRN';
        }
        if (this.Type === 'pdf') {
          link.download = 'Reporte de Recaudacion.pdf';
        }
        if (this.Type === 'sap-D') {
          link.download = 'CON' + this.getDate2Str(this.DateNow) + 'D.PRN';
        }
        if (this.Type === 'txt') {
          this.date = this.getDate2Str(this.DateNow).substring(2, 6);
          link.download = this.CodeServ.substring(3, 6) + this.getDate2Str(this.DateNow).substring(2, 8) + this.CodeServ.substring(0, 3) + ".txt";
        }
        link.click();
      }, (error) => this.GlobalService.danger('Fallo del Servicio: ', error.message));
  }
  handleChangePage($event: number) {
    //this.GlobalService.getLoader().subscribe((loading: boolean) => {this.loading=loading;});
    const n = $event;
    const filaIni = (n - 1) * this.quantity;
    const nroFila = this.quantity;
    this.callHead(n);

  }

  callHead(nropag: number): void {
    /*
    this._route.params.subscribe(params=>{      
      this.dateIni=params['dateIni'];
      this.dateEnd=params['dateEnd'];
      this.CodeServ=params['CodeServ'];    
    });
    */

    this.dateIni = this._router.parseUrl(this._router.url).queryParams.DateIniHeadStr;
    this.dateEnd = this._router.parseUrl(this._router.url).queryParams.DateEndHeadStr;
    this.CodeServ = this._router.parseUrl(this._router.url).queryParams.numberAccount;
    this.request = { DatesInicial: this.dateIni, DatesEnd: this.dateEnd, CodeService: this.CodeServ };

    this.request = {
      'CodeService': this.CodeServ,
      'DatesInicial': this.dateIni,
      'DatesEnd': this.dateEnd
    };

    this._ConsultorsServicePase
      .getDetailHeadPase(this.request)
      .subscribe((resp: ResponseModelPaseHead[]) => {
        this.ResponseModelPaseHead = resp;
        //this.ResponseModelPaseHead=response.json().body;
        this.ResponseModelPaseHeadObj.codeCollector = this.ResponseModelPaseHead[0].codeCollector;
        this.ResponseModelPaseHeadObj.codeService = this.ResponseModelPaseHead[0].codeService;
        this.ResponseModelPaseHeadObj.currencyCurrentAccount = this.ResponseModelPaseHead[0].currencyCurrentAccount;
        this.ResponseModelPaseHeadObj.codeCompany = this.ResponseModelPaseHead[0].codeCompany;
        this.ResponseModelPaseHeadObj.currencyDescriptionCuts = this.ResponseModelPaseHead[0].currencyDescriptionCuts;
        this.ResponseModelPaseHeadObj.currencyDescriptionTalks = this.ResponseModelPaseHead[0].currencyDescriptionTalks;
        this.ResponseModelPaseHeadObj.numberCounts = this.ResponseModelPaseHead[0].numberCounts;
        this.ResponseModelPaseHeadObj.registrationAmount = this.ResponseModelPaseHead[0].registrationAmount;
        this.ResponseModelPaseHeadObj.totalAmount = this.ResponseModelPaseHead[0].totalAmount;
        this.ResponseModelPaseHeadObj.tradeName = this.ResponseModelPaseHead[0].tradeName;
        this.quantity = this.ResponseModelPaseHead[0].registrationAmount;
        if (this.ResponseModelPaseHead.length > 0) {
          this.Filltable(nropag);
        }
      });

  }

  Filltable(nropag: number): void {
    this.GlobalService.getLoader().subscribe((loading: boolean) => { this.loading = true; });

    const n = nropag;
    this._route.params.subscribe(params => {
      this.dateIni = this.request.DatesInicial;//params['dateIni'];
      this.dateEnd = this.request.DatesEnd;//params['dateEnd'];
      this.CodeServ = this.request.CodeService;//params['CodeServ'];
      //console.log(params);      
    });
    this.RequestModelPaseDetail = {
      'CodeService': this.CodeServ,
      'DatesInitialProcess': this.dateIni,
      'DatesFinalProcess': this.dateEnd,
      'InitialRegistration': n// numero de pagina    
    };
    this._ConsultorsServicePase
      .getDetailPase(this.RequestModelPaseDetail)
      .subscribe((resp: ResponseModelPaseDetail[]) => {
        this.GlobalService.showLoader(true);
        this.ResponseModelPase = resp;
        this.quantity = this.ResponseModelPase[0].quantity;
        this.loading = true;
        this.GlobalService.showLoader(false);

      }, (error) => this.GlobalService.danger('fallo', error));

  }
}
