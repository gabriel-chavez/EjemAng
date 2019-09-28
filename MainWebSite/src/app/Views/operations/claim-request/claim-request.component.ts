import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { GlobalService } from '../../../Services/shared/global.service';
import { AccountsService } from '../../../Services/accounts/accounts.service';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { Roles } from '../../../Services/shared/enums/roles';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { UtilsService } from '../../../Services/shared/utils.service';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { ClaimRequestService } from '../../../Services/claimRequest/claim-request.service';
import { ClaimRequestData } from '../../../Services/claimRequest/models/claim-request-data';
import { ClaimRequestSpreadsheetsDto } from '../../../Services/claimRequest/models/claim-request-spreadsheets-dto';
import { ClaimRequestResult } from '../../../Services/claimRequest/models/claim-request-result';
import { ClaimRequestDto } from '../../../Services/claimRequest/models/claim-request-dto';
import { MyAccountsComponent } from '../../../Views/shared/components/my-accounts/my-accounts.component';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';
import { UserService } from '../../../Services/users/user.service';
import { Constants } from '../../../Services/shared/enums/constants';
import { ValidateConst } from '../../../Directives/validate-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.css'],
  providers: [AccountsService, ExchangeRatesService, UtilsService, ClaimRequestService]
})
export class ClaimRequestComponent implements OnInit {

  amount: number;
  currency: string;
  tipoOperationAddModi: string;
  issVisible: boolean;
  IssEdit: boolean;
  iflagAdd: boolean;
  DailyLimit: number;
  flagBtnUsers: boolean;
  IdUser: number;
  flagRoles: boolean;
  isRemoveModalVisible: boolean;
  isVisibleAuthandControllers: boolean;
  accountSelected: AccountResult = new AccountResult();
  isOverdraftBalance: boolean;
  unique_name: string;
  isValidConfirm: boolean;
  @Input() selectedAccountId: number;
  accountRequest: AccountDto = new AccountDto();
  // @Input() isAdministrative = false;
  // @Input() isVisible: boolean;
  @Input() disabled: boolean;
  @Output() onChange = new EventEmitter();
  @Input() loadFirstAccount = true;
  @Input() defaultAccount = 0;
  @Input() isAwait = false;
  @ViewChild(MyAccountsComponent) sourceComponent: MyAccountsComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  approversRequest: InputApprovers = new InputApprovers();
  ok: boolean;
  public CE = false;
  public R = false;
  public RCA = false;
  public RC = false;
  public RCC = false;
  public RTC = false;
  public RACU = false;
  public RBI = false;
  public RBM = false;
  public C = false;
  public CCA = false;
  public ProcessBatchId: number;
  public productName: string;
  public accountNumber: string;
  public claimType: string;
  public serviceName: string;
  public transactionDate: Date;
  public transactionTime: string;
  public description: string;
  public description1: string;
  public cardNumber: string;
  public fax: string;
  public phone: string;
  public phones: string;
  public phone1: string;
  public cellPhone1: string;
  public cellPhone: string;
  public cellPhones: string;
  public email: string;
  public emails: string;
  public address: string;
  public address1: string;
  public department: string;
  public val0 = false;
  sourceAccountDto: AccountDto = new AccountDto();
  processBatchNumber: number;
  claimRequestDto: ClaimRequestDto = new ClaimRequestDto();
  isVisibleToken: boolean;
  requestId: ClaimRequestSpreadsheetsDto = new ClaimRequestSpreadsheetsDto();
  sourceAccount: string;
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  isEdit = false;
  newFin = false;
  // informationModel: ClaimRequestResult;
  //  isPaymentSuccessful: boolean;
  list: ClaimRequestDto[] = [];
  request: AccountDto = new AccountDto();
  checkMoreEmail = false;
  private selectedLink: string;

  AHO = false;
  constructor(private userService: UserService, private ClaimRequestService: ClaimRequestService, private messageService: GlobalService, private router: Router) {
    this.selectedAccountId = 0;
    this.isOverdraftBalance = false;
    this.disabled = false;
    this.tipoOperationAddModi = '';
    this.issVisible = false;
    this.iflagAdd = false;
    this.DailyLimit = 0;
    this.flagBtnUsers = false;
    this.flagRoles = false;
    this.isDisabledFormAccount = false;
    this.isValidConfirm = false;
    this.accountRequest = {
      accountUse: 'D',
      roleId: 4,
      operationTypeId: [OperationType.formularioSolicitud],
      types: ['P']
    };
    this.isVisibleToken = false;
    this.processBatchNumber = 0;
    this.isRemoveModalVisible = false;
    // this.isPaymentSuccessful = false;
    this.isVisibleAuthandControllers = false;
    this.unique_name = userService.getUserToken().unique_name;
    this.address1 = this.address;
    this.phone1 = this.phone;
    this.cellPhone1 = this.cellPhone;
    this.claimRequestDto.cardNumber = this.unique_name;
  }

  ngOnInit() {
    this.approversRequest = {
      operationTypeId: OperationType.formularioSolicitud,
    };
    this.request = {
      accountUse: 'D',
      operationTypeId: [17],
      roleId: Roles.authorizer,
      types: ['P']
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.formularioSolicitud],
      types: this.claimType
    });
      this.approversRequest = ({
      operationTypeId: OperationType.formularioSolicitud
    });
  }
  setradio(e: string) {
    this.selectedLink = e;
    switch (e) {
      case 'optCor':
        this.CE = true;
        break;
      case 'optRec':
        this.R = true;
        this.RCA = true;
        this.C = false;
        this.CCA = false;
        break;
      case 'optCon':
        this.C = true;
        this.CCA = true;
        this.R = false;
        this.RCA = false;
        break;

    }
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.claimRequestDto.approvers = $event.approvers;
    this.claimRequestDto.controllers = $event.controllers;
    this.claimRequestDto.cismartApprovers = $event.cismartApprovers;
  }

  handleAccountChanged($event: AccountResult) {
    // debugger;
    this.claimRequestDto.sourceAccountId = $event.id;
    this.claimRequestDto.accountNumber = $event.formattedNumber;
    this.claimRequestDto.sourceAccount = $event.number;
  }
  isValid() {
    return this.accountSelected.id > 0;
  }

  handleSubmit() {
    this.claimRequestDto.amount = this.amount;
    this.claimRequestDto.currency = this.currency;
    this.claimRequestDto.operationTypeId = 17; // this.request.operationTypeId;
    this.claimRequestDto.accountId = this.claimRequestDto.sourceAccountId;
    this.claimRequestDto.userId = 1;
    this.address1 = this.claimRequestDto.address;
    this.phone1 = this.claimRequestDto.phone;
    this.cellPhone1 = this.claimRequestDto.cellPhone;
    if (this.checkMoreEmail) {
    if (this.claimRequestDto.email !== undefined) {
      if (this.claimRequestDto.email === '') {} else {
        const errorMessages = ValidateConst;
        const validateType = errorMessages.find(x => x.type === 'email');
        const isValidAccount = validateType.regex.test(this.claimRequestDto.email);
        if (!isValidAccount) {
          this.messageService.warning('Error de validación:', 'Introduzca un correo válido');
          return;
        }
      }
    }

      if (this.claimRequestDto.emails !== undefined) {
      if (this.claimRequestDto.emails === '') {} else {
        const errorMessages = ValidateConst;
        const validateType = errorMessages.find(x => x.type === 'email');
        const isValidAccount = validateType.regex.test(this.claimRequestDto.emails);
        if (!isValidAccount) {
          this.messageService.warning('Error de validación:', 'Introduzca un correo válido');
          return;
        }
      }
    }

    if (this.claimRequestDto.email !== this.claimRequestDto.emails) {
      this.messageService.warning('Error de validación:', 'El correo y la confirmación no son iguales ');
          return;
    }
  }
    if (this.claimRequestDto.productName === undefined || this.claimRequestDto.productName === '') {
      this.messageService.warning('Error de validación:', 'Debe Seleccionar el Tipo de Producto ');
      return;
    }
    if (this.claimRequestDto.sourceAccountId === undefined || this.claimRequestDto.sourceAccountId === 0) {
      this.messageService.warning('Error de validación:', 'Debe Seleccionar el número de la cuenta  ');
      return;
    }
    if (this.claimRequestDto.claimType === undefined || this.claimRequestDto.claimType === '') {
      this.messageService.warning('Error de validación:', 'Elija una de las opciones (Reclamo o Consulta)   ');
      return;
    }
    if (this.claimRequestDto.serviceName === undefined || this.claimRequestDto.serviceName === '') {
      this.messageService.warning('Error de validación:', 'Seleccione el tipo de servicio    ');
      return;
    }
    if (this.claimRequestDto.transactionDate || this.claimRequestDto.transactionTime) {
    if (this.claimRequestDto.transactionDate === undefined) {
      this.messageService.warning('Error de validación:', 'Introduzca la fecha de transacción ');
      return;
    }
    if (this.claimRequestDto.transactionTime === undefined || this.claimRequestDto.transactionTime === '') {
      this.messageService.warning('Error de validación:', 'Introduzca la hora de transacción ');
      return;
    }
  }

  if (this.claimRequestDto.amount || this.claimRequestDto.currency) {
    if (this.claimRequestDto.amount === undefined || this.claimRequestDto.amount === 0) {
      this.messageService.warning('Error de validación:', 'Debe Introducir el monto  ');
      return;
    }
    if (this.claimRequestDto.currency === undefined || this.claimRequestDto.currency === '') {
      this.messageService.warning('Error de validación:', 'Debe Introducir la moneda  ');
      return;
    }
  }
    if (this.claimRequestDto.description === undefined || this.claimRequestDto.description === '') {
      this.messageService.warning('Error de validación:', 'Debe registrar la descripción.  ');
      return;
    }


    this.showToken();
    // this.saveClaim();
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.claimRequestDto.tokenCode = $event.code;
    this.claimRequestDto.tokenName = $event.name;
    this.saveClaim();
  }

  saveClaim() {
    if (this.claimRequestDto.currency === undefined || this.claimRequestDto.currency === '') {
      this.claimRequestDto.currency = 'BOL';
    }
    if (this.claimRequestDto.amount === undefined || this.claimRequestDto.amount === 0) {
      this.claimRequestDto.amount = 1;
    }
    // if (this.claimRequestDto.transactionDate === undefined) {
    //   this.claimRequestDto.transactionDate = '';
    // }
    this.claimRequestDto.state = 'S';
    this.claimRequestDto.branchOffice = '201';
    this.claimRequestDto.agency = '204';
    this.claimRequestDto.address = this.claimRequestDto.address + ' El Nro : ' + this.claimRequestDto.number;
    this.claimRequestDto.phone = this.claimRequestDto.phone + ' Trab : ' + this.claimRequestDto.phones;
    this.claimRequestDto.cellPhone = this.claimRequestDto.cellPhone + ' Trab : ' + this.claimRequestDto.cellPhones;
    this.ClaimRequestService.SaveClaimRequest(this.claimRequestDto).subscribe(response => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isValidConfirm = true;
      }, (error) => this.messageService.danger('Operación Fallida', error.message));
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.currency = $event.currency;
    this.amount = $event.amount;
  }

  reload() {
    // window.location.reload(true);
    this.router.navigate(['/operations/claimRequest']);
  }

  showToken() {
    this.approversComponent.validationCismart()
      .subscribe(res => {
        if (res) {
          this.isVisibleToken = true;
        }
      });
  }
}
