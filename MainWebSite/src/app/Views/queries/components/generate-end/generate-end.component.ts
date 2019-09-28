import {OperationType} from '../../../../Services/shared/enums/operation-type';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GlobalService } from '../../../../Services/shared/global.service';
import { MovAccountsModel } from '../../../../Services/historical-accounts/models/MovAccountsModel';
import { HistoricalAccountsService } from '../../../../Services/historical-accounts/historical-accounts.service';
import { AccountPartialModel } from '../../../../Services/historical-accounts/models/AccountPartialModel';
import { AccountIni } from '../../../../Services/historical-accounts/models/AccountIni';
import { ParameterModel } from '../../../../Services/historical-accounts/models/ParameterModel';
import { CertificationTransction } from '../../../../Services/historical-accounts/models/CertificationTransctionModel';
import { StoreSelectedMessagesModel } from '../../../../Services/historical-accounts/models/StoreSelectedMessagesModel';
import { CurrencyAndAmount } from '../../../../Services/transfers/models/currency-and-amount';
import { HistoricalModelDto } from '../../../../Services/historical-accounts/models/historical-model-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../../Services/shared/enums/account-use';
import { Roles } from '../../../../Services/shared/enums/roles';
import { MovAccountsDto } from '../../../../Services/historical-accounts/models/MovAccountsDto';
import { SaveHistoricalAccountDto } from '../../../../Services/historical-accounts/models/save-historical-account-dto';
import { TokenCredentials } from '../../../../Services/tokens/models/token-credentials';
import { ProcessBatchResult } from '../../../../Services/historical-accounts/models/process-batch-result';
import { InputApprovers } from '../../../../Services/approvers-and-controllers/models/input-approvers';

@Component({
  selector: 'app-generate-end',
  templateUrl: './generate-end.component.html',
  styleUrls: ['./generate-end.component.css'],
  providers: [HistoricalAccountsService]
})
export class GenerateEndComponent implements OnInit {

  @Input() vectorIn: number[]= [];
  @Input() vectorListAccountMovement: MovAccountsModel[]= [];
  @Input() miModel: MovAccountsDto;
  @Input() isFlagVisible: boolean;
  @Input() inDetailAccountSource: AccountPartialModel;
  @Output() onChangeNew = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() valueGlobal = new EventEmitter<boolean>();

  public AccountSelect: AccountPartialModel= new AccountPartialModel();
  public accountIni: AccountIni = new AccountIni();
  public accountIniCtrAuth: AccountIni = new AccountIni();
  public ListAccount: AccountPartialModel[] = [];
  public ListParamGroup: ParameterModel[] = [];
  public ListParamGroupIntro: ParameterModel= new ParameterModel();
  public CertificateSelect: ParameterModel = new ParameterModel();
  public directions: string;
  public IniCtrolAuth: AccountIni = new AccountIni();

  public NumCtrol= 0;
  public NumAuth = 0;
  public isVisibleToken: boolean;
  public detailIni: CertificationTransction;
  public detailResult: CertificationTransction[] = [];
  public storeIni: StoreSelectedMessagesModel = new StoreSelectedMessagesModel();
  public storeResult: StoreSelectedMessagesModel = new StoreSelectedMessagesModel();
  numProcesBatch = 0;
  public swNumberIdProcess: boolean;
  public swBtnAceptaVer = false;
  HistoricalDto: HistoricalModelDto = new HistoricalModelDto(); // borrar
  SaveHistoricalDto: SaveHistoricalAccountDto = new SaveHistoricalAccountDto();
  isRemoveModalVisible: boolean;

  certificateTemp: CertificationTransction;
  certificateListTemp: CertificationTransction[] = [];
  sourceAccountDto: AccountDto = new AccountDto();
  types: string[] = ['P'];
  // Otro componente
  approversRequest: InputApprovers = new InputApprovers();
  sourceAccountRequest: AccountDto = new AccountDto();
  data: CurrencyAndAmount = new CurrencyAndAmount();
  typeCertificateSelected: ParameterModel = new ParameterModel();
  valueGlobalTwo = false;
  AmountTotal: number;
  ok: boolean;

  constructor(private _route: ActivatedRoute, private _router: Router, private _HistoricalAccountsService: HistoricalAccountsService,
    private messageService: GlobalService) {
        this.isFlagVisible = false;
        this.isVisibleToken = false;
        this.valueGlobalTwo = false;
        this.isRemoveModalVisible = false;
    }

  ngOnInit() {
    this.armar();
    this.isVisibleToken = false;
    this.swNumberIdProcess = false;
    this.valueGlobalTwo = false;
    this.approversRequest =  ({
      operationTypeId: OperationType.formularioSolicitud
    });
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.consultant,
      operationTypeId:  [OperationType.consultarCuentas],
      types: this.types
    });
  }
  armar() {
    this.directions = '';
    this.accountIni.OperationTypeId = [OperationType.formularioSolicitud];
    this.getListAccount(this.accountIni);
    // otro servicio
    this.ListParamGroupIntro.groups = 'CERT';
    this.getCertificateType(this.ListParamGroupIntro);
  }
  getListAccount(modIni: AccountIni) {
    this._HistoricalAccountsService.getListAccount(modIni)
    .subscribe((response: AccountPartialModel[]) => {
          this.ListAccount = response;
      }, (error) => this.messageService.warning('', error));
  }

  handleChangeDdpCertif(CertificateSelect: ParameterModel) {
      this.typeCertificateSelected = CertificateSelect;
  }
  getCertificateType(param: ParameterModel) {
    this._HistoricalAccountsService.getCertificateType()
    .subscribe((response: ParameterModel[]) => {
          this.ListParamGroup = response;
          this.CertificateSelect = response[0];
          this.typeCertificateSelected = response[0];
      }, (error) => this.messageService.warning('', error));
  }

  handleTocken() {
    if (this.valida()) {
      this.isVisibleToken = true;
      this.valueGlobal.emit(true);
      this.valueGlobalTwo = true;
      // this.handleAcept();
    }
  }
  handleAcept($event: TokenCredentials) {
    if (this.valida()) {
        this.isVisibleToken = true;
        this.swBtnAceptaVer = true;
        this.AmountTotal = 0;
      for (let i = 0; i < this.vectorIn.length; i++) {
        for (let j = 0; j < this.vectorListAccountMovement.length; j++) {
          if (this.vectorIn[i] === this.vectorListAccountMovement[j].id ) {
            this.certificateTemp = new CertificationTransction();
            this.certificateTemp.amount = this.vectorListAccountMovement[j].amount;
            this.AmountTotal =  this.AmountTotal + this.certificateTemp.amount;
            this.certificateTemp.currency = this.vectorListAccountMovement[j].currency;
            if (this.vectorListAccountMovement[j].moveName != null) {
              this.certificateTemp.gloss = this.vectorListAccountMovement[j].moveName.trim().substr(0, 30);
            } else {
              this.certificateTemp.gloss = '';
            }
            this.certificateTemp.dateMovement = this.vectorListAccountMovement[j].movementDate.toString();
            this.certificateTemp.hourMovement = this.vectorListAccountMovement[j].hora.toString();
            this.certificateTemp.accountsFormatted = this.vectorListAccountMovement[j].formattedAccount;
            if (this.CertificateSelect.description != null) {
                this.certificateTemp.typeCertificate = this.CertificateSelect.description.trim();
            }
            this.certificateTemp.addressShipping = this.directions;
            this.certificateTemp.user =  this.vectorListAccountMovement[i].users;
            this.certificateTemp.operationNumber = this.vectorListAccountMovement[i].sequentialCode;
            this.certificateListTemp.push(this.certificateTemp);
          }
        }
      }
      this.SaveHistoricalDto.tokenCode = $event.code;
      this.SaveHistoricalDto.tokenName = $event.name;
      this.SaveHistoricalDto.sourceAccountId =  this.inDetailAccountSource.id;
      this.SaveHistoricalDto.sourceAccount = '-';
      this.SaveHistoricalDto.currency = this.inDetailAccountSource.currency;
      this.SaveHistoricalDto.CertificateTransactions = this.certificateListTemp;
      this.SaveHistoricalDto.operationTypeId = OperationType.formularioSolicitud;

      if (this.AmountTotal > 0) {
        this.SaveHistoricalDto.amount = this.AmountTotal;
      } else {
        this.SaveHistoricalDto.amount = 0;
      }
      this._HistoricalAccountsService.saveHistorical(this.SaveHistoricalDto)
      .subscribe((res: ProcessBatchResult) => {
                  this.numProcesBatch = res.processBatchId;
                  this.isRemoveModalVisible = true;
                  this.swNumberIdProcess = true;
                  this.isVisibleToken = false;
                  this.valueGlobalTwo = true;
        }, (error) => this.messageService.warning('', error));
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
  valida(): Boolean {
      let ban = true;
      if (!this.typeCertificateSelected.description) {
          ban = false;
          this.messageService.warning('Datos incompletos.', 'Debe escoger el tipo de Certificacion.');
          return ban;
      }

      if (this.directions.length === 0) {
        ban = false;
        this.messageService.warning('Datos incompletos.', 'Debe ingresar la dirección de entrega.');
        return ban;
      }
      if (this.vectorIn.length === 0 || this.vectorListAccountMovement.length === 0 ) {
        ban = false;
        this.messageService.warning('Datos incompletos.', 'Debe escoger registros de la grilla');
      }
      return ban;
  }

  // handleTokenSubmit($event: any) {
  //   debugger;
  //   this.handleAcept();
  // }
  handleTokenSubmit($event: TokenCredentials) {
    debugger;
    if ($event) {
      this.isVisibleToken = false;
      this.handleAcept($event);
    }
  }


  handleApproversOrControllersChanged($event: any) {

  }
  handleChangedDrpAccount2( acc: AccountPartialModel) {
    // this.messageService.info('Sistema.', acc.formattedNumber + ' | Id =  ' + acc.id);
  }
  back() {
    this._router.navigate(['/queries/HistoricalAccounts']);
  }
  handleSourceAccountChange($event) {
      this.ListAccount = $event;
  }

}
