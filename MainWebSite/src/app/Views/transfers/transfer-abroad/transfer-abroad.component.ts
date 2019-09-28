import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { TicketResult } from '../../../Services/tickets/models/ticket-result';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { TicketCommissionResult } from '../../../Services/tickets/models/ticket-commission-result';
import { TransfersAbroadService } from '../../../Services/transfers-abroad/transfer-abroad.service';
import { ParametersResult } from '../../../Services/transfers-abroad/models/parameters-result';
import { GlobalService } from '../../../Services/shared/global.service';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { CurrencyAndAmountAbroad } from '../../../Services/transfers-abroad/models/currency-and-amount-abroad';
import { TicketCommissionDto } from '../../../Services/tickets/models/ticket-commission-dto';
import { Observable } from 'rxjs/Observable';
import { TicketOtherCurrencyResult } from '../../../Services/transfers-abroad/models/ticket-other-currency-Result';
import { TicketOtherCurrencyDto } from '../../../Services/transfers-abroad/models/ticket-other-currency-dto';
import { ConfigurationsParameter } from '../../../Services/transfers-abroad/models/configurations-parameter';
import { TicketValidationResult } from '../../../Services/tickets/models/ticket-validation-result';
import { TransferAbroadPreSaveDto } from '../../../Services/transfers-abroad/models/transfer-abroad-pre-save-dto';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { DataService } from '../../../Services/shared/data.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';

@Component({
  selector: 'app-transfer-abroad',
  templateUrl: './transfer-abroad.component.html',
  styleUrls: ['./transfer-abroad.component.css'],
  providers: [TransfersAbroadService, TicketsService, UtilsService]
})
export class TransferAbroadComponent implements OnInit {

  isDisabledForm: boolean;
  types: string[] = ['P'];
  sourceAccountRequest = new AccountDto();
  ticket: TicketResult = new TicketResult();
  ticketCommission: TicketCommissionResult = new TicketCommissionResult();
  ticketOtherCurrency: string;
  isRequiredTicketOtherCurrency: boolean;
  approversRequest: InputApprovers = new InputApprovers();
  parameters: ParametersResult = new ParametersResult();
  configurationParameters: ConfigurationsParameter = new ConfigurationsParameter();
  amountLimitTicket: number;
  ticketCommissionCharge: string;
  currencyAccount: string;
  maxAmountTransfer: number;
  transferAbroadDto: TransferAbroadPreSaveDto = new TransferAbroadPreSaveDto();
  sourceAccount: AccountResult = new AccountResult();
  currencyAndAmountAbroad: CurrencyAndAmountAbroad = new CurrencyAndAmountAbroad();
  dataTicketOtherCurrencyResult: TicketOtherCurrencyResult = new TicketOtherCurrencyResult();

  OPERATION_TYPE_TRANSFER_SEMIAUTOMATIC = 0;
  OPERATION_TYPE_TRANSFER_AUTOMATIC = 1;
  excedeedAmount = false;
  firstValidate = true;

  constructor(private transfersAbroadService: TransfersAbroadService,
    private router: Router,
    private globalService: GlobalService,
    private ticketsService: TicketsService,
    private dataService: DataService,
    private utilsService: UtilsService) {
    this.isDisabledForm = false;
    this.sourceAccountRequest = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      operationTypeId: [OperationType.transAlExteriorConCambioD],
      roleId: Roles.initiator,
      types: this.types
    });
    this.ticketOtherCurrency = '';
  }

  ngOnInit() {
    this.getParameters();
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.sourceAccount = $event;
    this.approversRequest = new InputApprovers({
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      operationTypeId: OperationType.transAlExteriorConCambioD,
      accountNumber: $event.formattedNumber
    });
    this.currencyAccount = $event.currency;
  }

  handleGetTicket($event: TicketModel) {
    this.ticket = $event.ticket;
  }

  getParameters() {
    this.transfersAbroadService.getParameters()
      .subscribe((response: ParametersResult) => {
        this.parameters = response;
      }, (error) => {
        this.globalService.danger('Servicio de Parametros', error.message);
      });
    this.transfersAbroadService.getConfigurationParameters()
      .subscribe((response: ConfigurationsParameter) => {
        this.configurationParameters = response;
        this.maxAmountTransfer = response.maxAmountTransfer;
      }, error => {
        this.globalService.danger('Servicio de Parametros de Configuración', error.message);
      });
  }

  getTicketCommission($event: TicketCommissionResult) {
    this.ticketCommission = $event;
  }

  handleChangeTicketOtherCurrency($event: string) {
    this.ticketOtherCurrency = $event;
  }

  handleCurrencyDestinationIsDollar($event: string) {
    if ($event) {
      this.isRequiredTicketOtherCurrency = false;
    } else {
      this.isRequiredTicketOtherCurrency = true;
    }
  }

  handleChangeCharge($event: string) {
    this.ticketCommissionCharge = $event;
  }

  handleOpenForm(currencyAndAmountAbroad: CurrencyAndAmountAbroad) {
    const isExcededd = this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance, currencyAndAmountAbroad.currencyTransfer, +currencyAndAmountAbroad.amountTransfer);
    if (isExcededd) {
      if (this.firstValidate) {
        this.excedeedAmount = true;
        this.firstValidate = false;
        return false;
      }
    }

    let validForSend = true;
    const { configurationParameters, ticket } = this;
    this.currencyAndAmountAbroad = currencyAndAmountAbroad;

    if (currencyAndAmountAbroad.amountTransfer > configurationParameters.maxAmountTransfer && !ticket.ticket && this.sourceAccount.currency !== currencyAndAmountAbroad.currencyTransfer) {
      this.globalService.warning('Comunicado Ticket de cambio preferencial Boliviano - Dólar',
        // tslint:disable-next-line:max-line-length
        `Para montos mayores o iguales a ${configurationParameters.maxAmountTransfer} USD, seleccione la casilla tipo de cambio preferencial Boliviano-Dólar y haga clic en el boton Obtener Ticket.Línea gratuita 800-10-9995`, true);
      validForSend = false;
    } else if (currencyAndAmountAbroad.amountTransfer < configurationParameters.minAmountTransfer) {
      this.globalService.warning('Comunicado Monto Transferencia',
        `Solo se puede realizar transferencias al exterior por un Monto a Transferir mayor o igual a ${configurationParameters.minAmountTransfer} dolares`);
      validForSend = false;
    }

    if (validForSend) {
      this.validateTicketsAndSave(+currencyAndAmountAbroad.amountTransfer,
        currencyAndAmountAbroad.currencyDestiny,
        +currencyAndAmountAbroad.amountDestiny);
    }
  }

  validateTicketsAndSave(amount: number, destinationCurrency: string, amountDestination: number) {
    let isValid = true;
    const { ticket, ticketCommission, ticketCommissionCharge, currencyAccount, ticketOtherCurrency } = this;
    const sourceCurrency = currencyAccount;
    const ticketDto = new TicketDto({
      amount: ticket.originalAmount,
      sourceCurrency: sourceCurrency,
      destinationCurrency: destinationCurrency,
      number: ticket.ticket
    });

    const ticketCommissionDto = new TicketCommissionDto({
      amount: ticketCommission.originalAmount,
      commissionCharge: ticketCommissionCharge,
      ticket: ticketCommission.ticket,
    });

    const observables = [];
    if (ticket.ticket > 0) {
      observables.push(this.ticketsService.verifyGMESATicket(ticketDto));
    }

    if (ticketCommission.ticket !== '') {
      observables.push(this.ticketsService.verifySGMDDTicket(ticketCommissionDto));
    }

    if (ticketOtherCurrency !== '') {
      observables.push(this.transfersAbroadService.getTicketOtherCurrency(new TicketOtherCurrencyDto({ ticket: ticketOtherCurrency })));
    }

    const combined = Observable.forkJoin(observables);
    combined.subscribe((res: any[]) => {
      let numberResult = 0;
      if (ticket.ticket > 0) {
        isValid = isValid && this.isValidTicket(res[numberResult]);
        ticket.exchangeRate = res[numberResult].exchangeRate;
        ticket.operationType = res[numberResult].operationType;
        numberResult++;
      }

      if (ticketCommission.ticket !== '') {
        isValid = isValid && this.isValidTicketCommission(res[numberResult], amount);
        numberResult++;
      }

      if (ticketOtherCurrency !== '') {
        isValid = isValid && this.isValidTicketOtherCurrency(res[numberResult],
          amount,
          amountDestination,
          destinationCurrency);
        numberResult++;
      }

      if (isValid) {
        this.saveTransfer();
      }
    }, (error) => {
      this.globalService.danger('Error', error.message);
    });

    if (observables.length === 0) {
      this.saveTransfer();
    }
  }

  isValidTicket(dataTicket: TicketValidationResult): boolean {
    if (dataTicket.isValid) {
      return true;
    }
    this.globalService.danger('Advertencia', dataTicket.errorMessage, true);
    return false;
  }

  isValidTicketCommission(dataTicketCommission: TicketCommissionResult, currentAmount: number): boolean {
    const { ticketCommission } = this;
    const correctstate = 'P';
    if (dataTicketCommission.state === correctstate && dataTicketCommission.responseCode === 0) {
      if (dataTicketCommission.originalAmount !== currentAmount) {
        this.globalService.warning('Advertencia',
          `El Monto a transferir del ticket ${dataTicketCommission.ticket} no corresponde al monto introducido`, true);
        return false;
      } else {
        ticketCommission.ticket = dataTicketCommission.ticket;
        ticketCommission.entry = dataTicketCommission.entry;
        ticketCommission.ourCommission = dataTicketCommission.ourCommission;
        ticketCommission.sendingType = dataTicketCommission.sendingType;
        ticketCommission.originalAmount = dataTicketCommission.originalAmount;
        ticketCommission.porteCommission = dataTicketCommission.porteCommission;
        ticketCommission.state = dataTicketCommission.state;
        ticketCommission.othersCommission = dataTicketCommission.othersCommission;
        return true;
      }
    } else {
      this.globalService.danger('Advertencia', 'En la validación del ticket de comisión');
      return false;
    }
  }

  isValidTicketOtherCurrency(dataTicketOtherCurrency: TicketOtherCurrencyResult,
    amount: number,
    amountDestination: number,
    destinationCurrency: string): boolean {
    this.dataTicketOtherCurrencyResult = dataTicketOtherCurrency;

    let isValid = true;
    if (dataTicketOtherCurrency.equivalentDollar !== amount) {
      this.globalService.warning('Advertencia'
        , `El Monto a transferir del ticket ${this.ticketOtherCurrency} no corresponde al monto introducido`, true);
      isValid = false;
    }

    if (dataTicketOtherCurrency.currency !== destinationCurrency) {
      this.globalService.warning('Advertencia'
        , `La moneda destino del ticket  ${this.ticketOtherCurrency} no corresponde a la moneda seleccionada`, true);
      isValid = false;
    }

    if (dataTicketOtherCurrency.amount !== amountDestination) {
      this.globalService.warning('Advertencia'
        , `El importe destino del ticket ${this.ticketOtherCurrency} no corresponde al monto introducido`, true);
      isValid = false;
    }
    return isValid;
  }

  validateForms(
    isValidFormSourceAccount: boolean
    , isValidFormTicket: boolean
    , isValidFormCurrencyAmount: boolean
    , isValidFormTicketCommission: boolean
    , isValidFormTicketOtherCurrency: boolean) {
    return isValidFormSourceAccount
      && isValidFormTicket
      && isValidFormCurrencyAmount
      && isValidFormTicketCommission
      && isValidFormTicketOtherCurrency;
  }

  saveTransfer() {
    const { transferAbroadDto, sourceAccount, currencyAndAmountAbroad, ticket, ticketCommission, dataTicketOtherCurrencyResult, ticketOtherCurrency } = this;
    transferAbroadDto.sourceAccountId = this.sourceAccount.id;
    transferAbroadDto.sourceAccount = sourceAccount.number;
    transferAbroadDto.amount = currencyAndAmountAbroad.amountTransfer;
    transferAbroadDto.currency = currencyAndAmountAbroad.currencyTransfer;
    transferAbroadDto.description = currencyAndAmountAbroad.description;
    transferAbroadDto.destinationAmount = currencyAndAmountAbroad.amountDestiny;
    transferAbroadDto.destinationCurrency = currencyAndAmountAbroad.currencyDestiny;
    transferAbroadDto.isTicket = ticket.ticket > 0;
    transferAbroadDto.numberTicket = ticket.ticket;
    transferAbroadDto.preferentialExchange = ticket.exchangeRate;
    transferAbroadDto.indicatorBuyOrSale = ticket.operationType;
    transferAbroadDto.isTicketCommission = ticketCommission.ticket !== '';
    transferAbroadDto.numberTicketCommission = ticketCommission.ticket;
    transferAbroadDto.commissionAmount = ticketCommission.entry;
    transferAbroadDto.amountTicketCommissionOur = ticketCommission.ourCommission;
    transferAbroadDto.detailCharges = ticketCommission.sendingType;
    transferAbroadDto.isTicketOtherCurrency = ticketOtherCurrency !== '';
    transferAbroadDto.numberTicketOtherCurrency = dataTicketOtherCurrencyResult.ticket;
    transferAbroadDto.typeTicketOtherCurrency = dataTicketOtherCurrencyResult.currency;
    transferAbroadDto.amountTicketOtherCurrency = dataTicketOtherCurrencyResult.amount;
    transferAbroadDto.exchangeRateOperationTicketOtherCurrency = dataTicketOtherCurrencyResult.exchangeRate;
    transferAbroadDto.amountInDollarsTicketOtherCurrency = dataTicketOtherCurrencyResult.equivalentDollar;
    transferAbroadDto.cicTicketOtherCurrency = dataTicketOtherCurrencyResult.cic;
    transferAbroadDto.transferOperationType = dataTicketOtherCurrencyResult.ticket !== undefined && dataTicketOtherCurrencyResult.ticket !== '' ? this.OPERATION_TYPE_TRANSFER_SEMIAUTOMATIC : this.OPERATION_TYPE_TRANSFER_AUTOMATIC;
    transferAbroadDto.ticketCommissionImporte = ticketCommission.originalAmount;
    transferAbroadDto.ticketCommissionPorte = ticketCommission.porteCommission;
    transferAbroadDto.tickectCommissionState = ticketCommission.state;
    transferAbroadDto.ticketCommissionOthers = ticketCommission.othersCommission;

    this.transfersAbroadService
      .preSaveTransfer(transferAbroadDto)
      .subscribe((res: ProcessBatchResult) => {
        this.dataService.serviceData = res.processBatchId;
        this.router.navigate(['/transfers/transfer-abroad-detail']);
      }, error => {
        this.globalService.danger('Servicio de transferencia al exterior', error.message);
      });
  }
}
