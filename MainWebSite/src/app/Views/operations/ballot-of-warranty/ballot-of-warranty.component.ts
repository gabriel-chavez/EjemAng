import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { ApproversDto } from '../../../Services/approvers-and-controllers/models/approvers-dto';
import { BallotOfWarrantyService } from '../../../Services/ballot-of-warranty/ballot-of-warranty.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { ConvertNumberDto } from '../../../Services/ballot-of-warranty/models/convert-number-dto';
import { ConvertNumberResult } from '../../../Services/ballot-of-warranty/models/convert-number-result';
import { UtilsService } from '../../../Services/shared/utils.service';
import { RatesResult } from '../../../Services/ballot-of-warranty/models/rates-result';
import { OthersComponent } from '../components/others/others.component';
import { DateAndDescription } from '../../../Services/ballot-of-warranty/models/date-and-description';
import { CompanyDataResult } from '../../../Services/ballot-of-warranty/models/company-data-result';
import { PublicWritingDetailResult } from '../../../Services/ballot-of-warranty/models/public-writing-detail-result';
import { ContractResult } from '../../../Services/ballot-of-warranty/models/contract-result';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { BallotOfWarrantyDto } from '../../../Services/ballot-of-warranty/models/ballot-of-warranty-dto';
import { Constants } from '../../../Services/shared/enums/constants';
import { UserService } from '../../../Services/users/user.service';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';

@Component({
  selector: 'app-ballot-of-warranty',
  templateUrl: './ballot-of-warranty.component.html',
  styleUrls: ['./ballot-of-warranty.component.css'],
  providers: [BallotOfWarrantyService, UtilsService]
})
export class BallotOfWarrantyComponent implements OnInit {
  ballotType = 'BDG';
  ballot: BallotOfWarrantyDto = new BallotOfWarrantyDto();
  rates: RatesResult = new RatesResult();
  constants = new Constants();
  isSave = true;
  approversRequest = new InputApprovers();
  isVisibleToken = true;
  disabled = false;

  constructor(private ballotOfWarrantyService: BallotOfWarrantyService,
    private messageService: GlobalService,
    private userService: UserService,
    private utilsService: UtilsService,
    private domSanitizer: DomSanitizer) {
    this.approversRequest = {
      operationTypeId: OperationType.boletaGarantia
    };
  }

  ngOnInit() {
    this.initBallot();
    this.ballotOfWarrantyService.getRates().subscribe((resp: RatesResult) => {
      this.rates = resp;
    }, (error) => this.messageService.danger('Servicio de boletas de garantía', error.message));
  }

  initBallot() {
    const currentUser = this.userService.getUserToken();
    this.ballot.personType = this.constants.TYPE_LEGAL_PERSON;
    this.ballot.nameThirdPerson = currentUser.company_name;
    this.ballot.documentCIThirdPerson = currentUser.user_document_number;
  }

  handleRequiredRoe(): boolean {
    if (this.ballot.currency === Constants.currencyUsd) {
      return +this.ballot.amount <= +this.rates.amountRequiredRoe;
    } else if (this.ballot.currency === Constants.currencyBol) {
      return +this.utilsService.changeAmountBolToUsd(this.ballot.amount) <= +this.rates.amountRequiredRoe;
    }
    return false;
  }

  handleSave() {
    this.ballotOfWarrantyService.Save(this.ballot).subscribe((resp) => {
      const borrame = resp;
    }, (error) => this.messageService.danger('Servicio de Boletas de Garantia', error.message));
  }

  // handleRoeDocument($event: BallotOfWarranty) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.roeDocument = $event.roeDocument;
  // }

  // handleBallotOfWarranty() {
  //   this.handleUniqueAmortization();
  // }

  // handleUniqueAmortization() {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_1 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_2 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_3 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_4 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_5 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_6 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_7 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_8 = undefined;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_1 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_2 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_3 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_4 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_5 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_6 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_7 = 0;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_8 = 0;
  // }

  // handleDateandDescriptionAl1($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_1 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_1 = $event.description;
  // }

  // handleDateandDescriptionAl2($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_2 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_2 = $event.description;
  // }

  // handleDateandDescriptionAl3($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_3 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_3 = $event.description;
  // }

  // handleDateandDescriptionAl4($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_4 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_4 = $event.description;
  // }

  // handleDateandDescriptionAl5($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_5 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_5 = $event.description;
  // }

  // handleDateandDescriptionAl6($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_6 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_6 = $event.description;
  // }

  // handleDateandDescriptionAl7($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_7 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_7 = $event.description;
  // }

  // handleDateandDescriptionAl8($event: DateAndDescription) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.aL_8 = $event.date;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.uS_8 = $event.description;
  // }

  // handleDeliveryInstructions($event: BallotOfWarranty) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.entityName = $event.entityName;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.entityDocumentCI = $event.entityDocumentCI;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.enrolmentFFNN = $event.enrolmentFFNN;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.placeOfDelivery = $event.placeOfDelivery;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.agency = $event.agency;
  // }

  // handleOthers($event: BallotOfWarranty) {
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.typeWarranty = $event.typeWarranty;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.cupRate = $event.cupRate;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.preferentialComissionType = $event.preferentialComissionType;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.comissionType = $event.comissionType;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.numberDPF = $event.numberDPF;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.bank = $event.bank;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.firstTitular = $event.firstTitular;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.firstDocumentCI = $event.firstDocumentCI;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.secondTitular = $event.secondTitular;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.secondDocumentCI = $event.secondDocumentCI;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.thirdTitular = $event.thirdTitular;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.thirdDocumentCI = $event.thirdDocumentCI;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.notaryPublicFaith = $event.notaryPublicFaith;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.numberOfPublicWriting = $event.numberOfPublicWriting;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.dateOfPublicDeed = $event.dateOfPublicDeed;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.accountNumberId = $event.accountNumberId;
  //   this.ballotOfWarranty.ballotOfWarrantyDetail.accountDebitId = $event.accountDebitId;
  // }

  // handleNotaries($event: PublicWritingDetailResult[]) {
  //   this.ballotOfWarranty.notaries = $event;
  // }

  // handleConfirm() {
  //   this.isValidConfirm = true;
  //   this.Confirm = true;
  //   this.ballotOfWarrantyService.GetContract(this.ballotOfWarranty).subscribe((resp: ContractResult) => {
  //     this.ballotOfWarranty.ballotOfWarrantyDetail.contract = resp.contract;
  //     this.handleConvertContract(resp);
  //     const iframe = document.querySelector('iframe');
  //     iframe.src = URL.createObjectURL(this.reportContract);
  //   }, (error) => this.messageService.danger('No se pudo generar el contrato para esta operación', error.message));
  //   this.civilStates = this.ballotOfWarranty.ballotOfWarrantyDetail.civilState;


  //   if (this.civilStates === 'S') {
  //     this.civilStates = 'SOLTERO';
  //   } else {
  //     if (this.civilStates === 'C') {
  //       this.civilStates = 'CASADO';
  //     } else {
  //       if (this.civilStates === 'D') {
  //         this.civilStates = 'DIVORCIADO';
  //       } else {
  //         if (this.civilStates === 'V') {
  //           this.civilStates = 'VIUDO';
  //         } else {
  //           if (this.civilStates === '') {
  //             this.civilStates = '---------';
  //           }
  //         }
  //       }
  //     }
  //   }
  //   this.objects = this.ballotOfWarranty.ballotOfWarrantyDetail.object;
  //   if (this.objects === 'BIA') {
  //     this.objects = 'BUENA INVERSIÓN DE ANTICIPO';
  //   } else {
  //     if (this.objects === 'CC') {
  //       this.objects = 'CUMPLIMIENTO DE CONTRATO';
  //     } else {
  //       if (this.objects === 'CJA') {
  //         this.objects = 'CONSECUENCIAS JUDICIALES O ADMINISTRATIVAS';
  //       } else {
  //         if (this.objects === 'PDA') {
  //           this.objects = 'PAGO DERECHOS ARANCELARIOS O IMPOSITIVOS';
  //         } else {
  //           if (this.objects === 'SDP') {
  //             this.objects = 'SERIEDAD DE PROPUESTA';
  //           } else {
  //             if (this.objects === 'OTR') {
  //               this.objects = this.ballotOfWarranty.ballotOfWarrantyDetail.objectSpecification;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  // }

  // handleConvertContract($event: ContractResult) {
  //   const byteCharacters = window.atob($event.contract);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   this.reportContract = new Blob([byteArray], { type: 'application/pdf' });
  // }

  // handleAccountDebit($event) {
  //   this.accountDebit = $event;
  // }
  // handleNumberAccount($event) {
  //   this.numberAccount = $event;
  // }
  // handleDownloadReport() {
  //   if (navigator.msSaveBlob) {
  //     return navigator.msSaveOrOpenBlob(this.reportContract, 'Contrato Boleta de garantía');
  //   }
  //   const data = window.URL.createObjectURL(this.reportContract);
  //   const link = document.createElement('a');
  //   link.href = data;
  //   link.download = 'Contrato Boleta de garantía';
  //   link.click();
  // }
  // reload() {
  //   window.location.reload(true);
  // }
  // handleSubmit() {
  //   this.isVisibleToken = true;
  //   // this.saveClaim();
  // }
  // handleTokenSubmit($event: TokenCredentials) {
  //   this.ballotOfWarranty.tokenCode = $event.code;
  //   this.ballotOfWarranty.tokenName = $event.name;
  //   this.handleSendP();
  // }

  // handleSendP() {
  //   this.ballotOfWarrantyService.SaveBallotOfWarranty(this.ballotOfWarranty).subscribe(resp => {
  //     this.processBatchNumber = resp.processBatchId;
  //     this.isRemoveModalVisible = true;
  //     this.isVisibleToken = false;
  //     this.Confirm = false;
  //   }, (error) => this.messageService.danger('No se pudo obtener el contrato requerido para esta operacion', error.message));
  // }
}
