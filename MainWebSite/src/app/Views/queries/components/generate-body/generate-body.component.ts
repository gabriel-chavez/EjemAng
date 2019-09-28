import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { HistoricalAccountsService } from '../../../../Services/historical-accounts/historical-accounts.service';
import { MovAccountsDto } from '../../../../Services/historical-accounts/models/MovAccountsDto';
import { MovAccountsModel } from '../../../../Services/historical-accounts/models/MovAccountsModel';
import { NumberRowModel } from '../../../../Services/historical-accounts/models/NumberRowModel';
import { NumberRowAccount } from '../../../../Services/historical-accounts/models/NumberRowAccountModel';
import { GlobalService } from '../../../../Services/shared/global.service';
import { HistoricalAccountsResult } from '../../../../Services/historical-accounts/models/HistoricalAccountsResult';
import { UtilsService } from '../../../../Services/shared/utils.service';

@Component({
  selector: 'app-generate-body',
  templateUrl: './generate-body.component.html',
  styleUrls: ['./generate-body.component.css'],
  providers: [HistoricalAccountsService, UtilsService]
})
export class GenerateBodyComponent implements OnInit, OnChanges {

  public NumAccount = '';
  public numeroAccount = 0;
  private accounts: Account[] = [];
  public reportType: string;
  public NUM_REGISTROS = 20;
  public rowElegidos: number[]= [];
  flagHistTr: boolean;
  @Input() dateInitBody: Date;
  @Input() dateEndBody: Date;
  @Input() miModel: MovAccountsDto;
  @Input() isVisiblePanelBody: boolean;
  @Input() valueGlobal: boolean;

  @Output() onChange = new EventEmitter();
  @Output() onChangeTwo = new EventEmitter();


  public col01: boolean;
  public col02: boolean;
  public col03: boolean;
  public col04: boolean;

  public col05: boolean;
  public col06: boolean;
  public col07: boolean;
  public col08: boolean;
  public col09: boolean;
  public col10: boolean;
  public NroLote: boolean;
  public Benifi: boolean;
  public Ordenante: boolean;
  public Operation: boolean;

  private DataIniAccountMovement: MovAccountsDto = new MovAccountsDto();
  public result: HistoricalAccountsResult;
  public resultTwo: MovAccountsModel[] = [];
  public resultRow: NumberRowModel = new NumberRowModel();
  public numberRowMsg: string;
  public numeroFilas: number;
  public currentPage = 1;
  ok: boolean;
  f1: Date = new Date('2018/01/01');
  f2: Date = new Date('2018/01/01');
  public dataAccMovido: MovAccountsDto = new MovAccountsDto();
  public dataIniAccountNumber: NumberRowAccount = new NumberRowAccount();
  public maxPag = 1;
  miModelTemp: MovAccountsDto = new MovAccountsDto();
  nameReport: 'Reporte SAP Cabezera';


  constructor(private _HistoricalAccountsService: HistoricalAccountsService,
              private messageService: GlobalService, private utilsService: UtilsService) {
                this.flagHistTr = false;
              }
  ngOnChanges() {
    if (this.isVisiblePanelBody) {
      this.callListFull(this.miModel);
    } else {
      this.messageService.warning ('Sistema.', 'No existen datos.');
    }
  }
  ngOnInit() {
    this.col01 = true;
    this.col02 = true;
    this.col03 = true;
    this.col04 = true;
    this.col05 = true;
    this.col06 = true;
    this.col07 = true;
    this.col08 = true;
    this.col09 = true;
    this.col10 = true;
    this.NroLote = false;
    this.Ordenante = false;
    this.Benifi = false;
    this.Operation = false;
  }

 callListFull(miModel: MovAccountsDto) {
        if (this.miModel.NumberRow > 0) {
          this.numberRowMsg = this.miModel.NumberRow.toString();
          this.numeroFilas = this.miModel.NumberRow;
          this.miModelTemp = miModel;
          if (this.miModel.NumberRow <= this.NUM_REGISTROS) {
              this.maxPag = 1;
          } else {
            if ((this.miModel.NumberRow % this.NUM_REGISTROS) === 0 ) {
                  const n1 = this.numeroFilas / this.NUM_REGISTROS;
                  this.maxPag = Math.ceil(n1);
            } else {
                  const n1 = this.numeroFilas / this.NUM_REGISTROS;
                  this.maxPag = Math.ceil(n1) + 1;
            }
          }
        this.dataAccMovido = {
          'NumberCta': miModel.NumberCta,
          'DateIni': miModel.DateIni,
          'DateEnd': miModel.DateEnd,
          'RowIni': 0,
          'NumberRow': this.NUM_REGISTROS,
          'ReportType': this.reportType,
          'OutListType': false,
          'FormattedAccount': miModel.FormattedAccount
        };
        this._HistoricalAccountsService
        .getListHistorical(this.dataAccMovido)
        .subscribe((response: HistoricalAccountsResult) => {
                  this.result = response;
                  this.flagHistTr = response.flagHistTr;
                  this.resultTwo = response.tableBody;
            }, (error) => this.messageService.danger('Error en el servicio.', error ));
        } else {
            this.messageService.warning('Sistema', 'No existen registros.');
      }
  }

SetGrillaNueva(miModel: MovAccountsDto, nroPagina: number) {
  const filaIni = (nroPagina - 1) * this.NUM_REGISTROS;
  const nroFila = this.NUM_REGISTROS;
  this.dataAccMovido = {
    'NumberCta': miModel.NumberCta,
    'DateIni': miModel.DateIni,
    'DateEnd': miModel.DateEnd,
    'RowIni': filaIni,
    'NumberRow': nroFila,
    'ReportType': 'xls',
    'OutListType': false,
    'FormattedAccount': miModel.FormattedAccount
  };
  this._HistoricalAccountsService.getListHistorical(this.dataAccMovido)
          .subscribe((response: HistoricalAccountsResult) => {
            this.result = response;
            this.resultTwo = response.tableBody;
        }, (error) => this.messageService.danger('Mensaje', error ));
   }
   getReport(miModel: MovAccountsDto, typereport: string) {
    this.dataAccMovido = {
      'NumberCta': miModel.NumberCta,
      'DateIni': miModel.DateIni,
      'DateEnd': miModel.DateEnd,
      'RowIni': 0,
      'NumberRow': 20,
      'ReportType': typereport,
      'OutListType': true,
      'FormattedAccount': miModel.FormattedAccount
    };
    this._HistoricalAccountsService.getReportHistorical(this.dataAccMovido)
        .subscribe((resp: Blob) => {
          this.utilsService.donwloadReport('Historicos', resp);
        }, (error) => this.messageService.danger('Fallo del servicio: ', error.message));
  }
hanglePrimer() {
  // alert('Primero.');
}

handleChangePage($event: number) {
    const n = $event;
    const filaIni = (n - 1) * this.NUM_REGISTROS;
    const nroFila = this.NUM_REGISTROS;
    if (this.miModelTemp.DateIni.length !== 0 && this.miModel.DateEnd.length !== 0) {
      this.dataAccMovido = {
        'NumberCta': this.miModelTemp.NumberCta,
        'DateIni': this.miModelTemp.DateIni,
        'DateEnd': this.miModel.DateEnd,
        'RowIni': filaIni,
        'NumberRow': nroFila,
        'ReportType': 'typereport',
        'OutListType': false,
        'FormattedAccount': this.miModel.FormattedAccount

      };
    } else { alert('Fecha inicio/final vacios!!!!'); }
    this.SetGrillaNueva(this.dataAccMovido, n);
}
getDate2Str2(fecha: Date): string {
      if (fecha != null) {
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
        returnDate = yyyy + '-' + mesSt + '-' + diaSt;
        return returnDate;
      }
}
handleCheckedRow(id: number) {
    this.rowElegidos = this.addOrRemoveElements(this.rowElegidos, id);
    this.numeroAccount = this.rowElegidos.length;
    this.onChange.emit(this.rowElegidos);
    this.onChangeTwo.emit(this.resultTwo);
}

addOrRemoveElements(array: number[], item: number): number[] {
    array.includes(item) ? array.splice(array.indexOf(item, 0), 1) : array.push(item);
    return array;
}
}
