import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
// import { BallotOfWarranty } from '../../../../Services/ballot-of-warranty/models/ballot-of-warranty';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { BallotOfWarrantyService } from '../../../../Services/ballot-of-warranty/ballot-of-warranty.service';
import { RatesResult } from '../../../../Services/ballot-of-warranty/models/rates-result';
import { PublicWritingDetailResult } from '../../../../Services/ballot-of-warranty/models/public-writing-detail-result';
import { UtilsService } from '../../../../Services/shared/utils.service';
import { TimeDepositResult } from '../../../../Services/ballot-of-warranty/models/time-deposit-result';
import { CurrencyAndAmount } from '../../../../Services/transfers/models/currency-and-amount';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
  providers: [ParametersService, BallotOfWarrantyService, UtilsService]
})
export class OthersComponent implements OnInit {
  requestParameter: ParameterDto = new ParameterDto();
  responseParameterWarranties: ParameterResult[];
  isVisibleCreditLine: boolean;
  isVisibleDepositPlace: boolean;
  isVisiblePignorationFound: boolean;
  timeDeposits: TimeDepositResult[] = [];
  publicDetailResult: PublicWritingDetailResult[] = [];
  DPF: TimeDepositResult = new TimeDepositResult();
  comissionType: string;
  typeWarranty: ParameterResult = new ParameterResult();
  sourceAccountDto: AccountDto = new AccountDto();
  accountsVisible: boolean;
  @Output() action = new EventEmitter();
  @Output() actionNotaries = new EventEmitter();
  @Output() actionAccountDebit = new EventEmitter();
  @Output() actionNumberAccount = new EventEmitter();
  @Input() amountVerify: CurrencyAndAmount;

  constructor(private parameterService: ParametersService,
    private messageService: GlobalService,
    private ballotOfWarrantyService: BallotOfWarrantyService,
    private utilsService: UtilsService) {
    // this.isVisibleCreditLine = false;
    // this.isVisibleDepositPlace = false;
    // this.isVisiblePignorationFound = false;
    // this.ballotOfWarrantyData.typeWarranty = Constants.EMPTY_STRING;
    // this.ballotOfWarrantyData.preferentialComissionType = Constants.EMPTY_STRING;
    // this.accountsVisible = false;
  }

  ngOnInit() {
    this.requestParameter.group = Constants.TYPE_WARRANTY;
    this.parameterService.getByGroup(this.requestParameter).subscribe((resp: ParameterResult[]) => {
      this.responseParameterWarranties = resp;
      this.typeWarranty = resp[0];
    }, (error) => this.messageService.danger('No se pudieron obtener los datos', error.message));
    // this.rateDto.typeRate = 'BG';
    // this.ballotOfWarrantyService.GetRate(this.rateDto).subscribe((resp: RateResult) => {
    //   this.rateResultComission = resp;
    // }, (error) => this.messageService.danger('No se pudieron obtener los datos', error.message));
  }

  // handleSourceAccountAccountDebitIdChanged($event) {
  //   this.ballotOfWarrantyData.accountDebitId = $event.id;
  //   this.handleBallotOfWarrantyData();
  //   this.actionAccountDebit.emit($event.formattedNumber);
  // }

  // handleSourceAccountNumberAccountIdChanged($event) {
  //   this.ballotOfWarrantyData.accountNumberId = $event.id;
  //   this.handleBallotOfWarrantyData();
  //   this.actionNumberAccount.emit($event.formattedNumber);
  // }

  // handleTypeWarrantySelected($event) {
  //   this.sourceAccountDto.currencies = [this.amountVerify.currency];
  //   this.accountsVisible = true;
  //   this.ballotOfWarrantyData.cupRate = this.rateResultComission.amountRate;
  //   switch ($event) {
  //     case Constants.FUND_PLEDGE:
  //       this.rateDto.typeRate = 'BGPDF';
  //       this.ballotOfWarrantyData.comissionType = 'M';
  //       this.verifyAmount(this.rateDto);
  //       this.accountsVisible = true;
  //       this.isVisiblePignorationFound = true;
  //       this.isVisibleDepositPlace = this.isVisibleCreditLine = false;
  //       this.handleBallotOfWarrantyData();
  //       break;
  //     case Constants.CREDIT_LINE:
  //       this.isVisibleCreditLine = true;
  //       this.isVisibleDepositPlace = this.isVisiblePignorationFound = false;
  //       this.rateDto.typeRate = 'BGLCR';
  //       this.verifyAmount(this.rateDto);
  //       this.handleCupRateT();
  //       this.handleGetPublicWritingDetail();
  //       this.handleBallotOfWarrantyData();
  //       break;
  //     case Constants.DEPOSIT_PLACE:
  //       this.rateDto.typeRate = 'BGDPF';
  //       this.verifyAmount(this.rateDto);
  //       this.isVisibleDepositPlace = true;
  //       this.isVisiblePignorationFound = this.isVisibleCreditLine = false;
  //       this.ballotOfWarrantyData.cupRate = 0;
  //       this.ballotOfWarrantyService.GetTimeDeposit().subscribe((resp: TimeDepositResult[]) => {
  //         this.timeDeposits = resp;
  //         this.DPF = resp[0];
  //         this.ballotOfWarrantyData.notaryPublicFaith = resp[resp.length - 1].longDescription;
  //         this.ballotOfWarrantyData.numberOfPublicWriting = resp[resp.length - 1].code;
  //       }, (error) => {
  //         this.messageService.info('No se pudieron obtener los datos', error.message);
  //       });
  //       this.handleBallotOfWarrantyData();
  //       break;
  //   }
  // }

  // handleGetPublicWritingDetail() {
  //   this.ballotOfWarrantyService.GetPublicWritingDetail().subscribe((resp: PublicWritingDetailResult[]) => {
  //     this.publicDetailResult = resp;
  //     this.actionNotaries.emit(this.publicDetailResult);
  //     this.ballotOfWarrantyData.numberOfPublicWriting = resp[resp.length - 1].publicWritingNumber;
  //     this.ballotOfWarrantyData.dateOfPublicDeed = resp[resp.length - 1].datePublicWriting;
  //     this.ballotOfWarrantyData.notaryPublicFaith = resp[resp.length - 1].nameOfNotaryPublicFaith;
  //   }, (error) => this.messageService.danger('No se pudieron obtener los datos', error.message));
  // }

  // handleComissionType($event) {
  //   this.ballotOfWarrantyData.comissionType = $event;
  //   this.handleCupRateCP();
  //   this.handleBallotOfWarrantyData();
  // }

  // handleCupRateT() {
  //   if (this.amountVerify.currency === this.comissionRate.currencyType) {
  //     const percentAmount = this.ballotOfWarrantyData.cupRate / 100;
  //     const totalAmount = this.amountVerify.amount * percentAmount;
  //     if (totalAmount > this.comissionRate.amountRate) {
  //       this.messageService.success('Monto Valido:', 'El monto introducido es superior al limite permitido para esta operacion ');
  //     }
  //   } else {
  //     let convertedAmount = this.utilsService.changeAmountBolToUsd(this.amountVerify.amount);
  //     const comissionTotal = this.ballotOfWarrantyData.cupRate / 100;
  //     convertedAmount = convertedAmount * comissionTotal;
  //     if (convertedAmount > this.comissionRate.amountRate) {
  //       this.messageService.success('Monto Valido:', 'El monto introducido es superior al limite permitido para esta operacion ');
  //     }
  //   }
  //   this.handleBallotOfWarrantyData();
  // }

  // handleCupRateCP() {
  //   if (this.ballotOfWarrantyData.comissionType === 'M') {
  //     if (this.amountVerify.currency === this.comissionRate.currencyType) {
  //       if (this.ballotOfWarrantyData.cupRate > this.comissionRate.amountRate) {
  //         this.messageService.success('Monto válido:', '');
  //       }
  //     } else {
  //       const cupRate = this.ballotOfWarrantyData.cupRate;
  //       const convertedAmount = this.utilsService.changeAmountBolToUsd(cupRate);
  //       if ( this.comissionRate.amountRate < convertedAmount ) {
  //         this.messageService.success('Monto válido:', '');
  //       }
  //     }
  //   }
  //   if (this.ballotOfWarrantyData.comissionType === 'P') {
  //     this.handleCupRateT();
  //   }
  // }

  // verifyAmount($event: RateDto) {
  //   this.ballotOfWarrantyService.GetRate($event).subscribe((resp: RateResult) => {
  //     if (this.amountVerify.currency === resp.currencyType) {
  //       if (+this.amountVerify.amount > resp.amountRate) {
  //         this.handleResetComponent();
  //         this.messageService.warning('Monto Excedido:', 'El monto limite permitido para esta operacion es: ' + resp.amountRate
  //           + ' ' + resp.currencyType);
  //         return;
  //       }
  //     } else {
  //       const convertedAmount = this.utilsService.changeAmountUsdToBol(this.amountVerify.amount);
  //       if (convertedAmount > resp.amountRate) {
  //         this.handleResetComponent();
  //         this.messageService.warning('Monto Excedido:', 'El monto limite permitido para esta operacion es: ' + resp.amountRate
  //           + ' ' + resp.currencyType);
  //         return;
  //       }
  //     }
  //     this.rateResult = resp;
  //   }, (error) => this.messageService.danger('No se pudieron obtener los datos', error.message));
  // }

  // handleBallotOfWarrantyData() {
  //   this.action.emit(this.ballotOfWarrantyData);
  // }

  // handleTimeDeposit($event: TimeDepositResult) {
  //   this.ballotOfWarrantyData.notaryPublicFaith = $event.longDescription;
  //   this.ballotOfWarrantyData.numberOfPublicWriting = $event.code;
  //   this.handleBallotOfWarrantyData();
  // }

  // handleResetComponent() {
  //   this.ballotOfWarrantyData.typeWarranty = '';
  //   this.ballotOfWarrantyData.cupRate = undefined;
  //   this.ngOnInit();
  //   this.isVisibleCreditLine = false;
  //   this.isVisibleDepositPlace = false;
  //   this.isVisiblePignorationFound = false;
  //   this.accountsVisible = false;
  //   this.ballotOfWarrantyData.firstDocumentCI = '';
  //   this.ballotOfWarrantyData.firstTitular = '';
  //   this.ballotOfWarrantyData.bank = '';
  //   this.ballotOfWarrantyData.secondTitular = '';
  //   this.ballotOfWarrantyData.secondDocumentCI = '';
  //   this.ballotOfWarrantyData.thirdTitular = '';
  //   this.ballotOfWarrantyData.thirdDocumentCI = '';
  //   this.ballotOfWarrantyData.numberDPF = '';
  //   this.ballotOfWarrantyData.numberOfPublicWriting = '';
  //   this.ballotOfWarrantyData.dateOfPublicDeed = undefined;
  //   this.ballotOfWarrantyData.notaryPublicFaith = '';
  //   this.ballotOfWarrantyData.accountDebitId = undefined;
  // }

}
