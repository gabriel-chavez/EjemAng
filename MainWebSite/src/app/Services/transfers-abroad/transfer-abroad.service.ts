import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { TicketOtherCurrencyDto } from './models/ticket-other-currency-dto';
import { ParametersResult } from './models/parameters-result';
import { ConfigurationParameterResult, } from './models/configuration-parameter-result';
import { ConfigurationsParameter } from './models/configurations-parameter';
import { TicketOtherCurrencyResult } from './models/ticket-other-currency-Result';
import { TransferAbroadDto } from './models/transfer-abroad-dto';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { DestinationBanksDto } from './models/destination-banks-dto';
import { DestinationBankResult } from './models/destination-bank-result';
import { GetTransferAbroadDto } from './models/get-transfer-abroad-dto';
import { TransferAbroadResult } from './models/transfer-abroad-result';
import { ParameterASFIResult } from './models/parameter-asfi-result';
import { TransferAbroadDetailResult } from './models/transfer-abroad-detail-result';
import { TransferAbroadDetailDto } from './models/transfer-abroad-detail-dto';
import { TransferAbroadPreSaveDto } from './models/transfer-abroad-pre-save-dto';
import { TransferAbroadFrecuent } from './models/transfer-abroad-frecuent';
import { TransferAbroadFrecuentDto } from './models/transfer-abroad-frecuent-dto';
import { TransferAbroadSwiftDto } from './models/transfer-abroad-swift-dto';
import { TransferAbroadSwiftResult, TransferAbroadSwiftListResult } from './models/transfer-abroad-swift-result';
import { TransferAbroadSwiftReportDto } from './models/transfer-abroad-swift-report-dto';
import { OperationReceivedDto } from './models/operation-received-dto';
import { OperationReceivedResult } from './models/operation-received-result';
import { TransferAbroadSwiftReportReceivedDto } from './models/transfer-abroad-swift-report-received-dto';

@Injectable()
export class TransfersAbroadService {

  private transfersService = this.config.getConfig('TransfersAbroadServiceUrl');
  private MAX_APOM_TRANSFER = 'MAX_APOMTR';
  private MIN_APOM_TRANSFER = 'MIN_APOMTR';
  private SCHEDULE_TRANSFERENCE = 'M_HORARIO';

  constructor(private config: AppConfig, private jwt: JwtService) { }

  getParameters(): Observable<ParametersResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetParameters`, '');
  }

  getConfigurationParameters(): Observable<ConfigurationsParameter> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetConfigurationsParameters`, '')
      .map((res: ConfigurationParameterResult[]) => {
        const result: ConfigurationsParameter = new ConfigurationsParameter();
        if (res.length > 0) {
          result.maxAmountTransfer = +res.find(x => x.code === this.MAX_APOM_TRANSFER).value;
          result.minAmountTransfer = +res.find(x => x.code === this.MIN_APOM_TRANSFER).value;
          result.schedules = res.find(x => x.code === this.SCHEDULE_TRANSFERENCE).description;
          return result;
        }
        return null;
      });
  }

  getTicketOtherCurrency(ticket: TicketOtherCurrencyDto): Observable<TicketOtherCurrencyResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetTicketOtherCurrency`, ticket);
  }

  saveTransfer(transferAbroadDto: TransferAbroadDto): Observable<ProcessBatchResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}SaveTransfer`, transferAbroadDto);
  }

  preSaveTransfer(transferAbroadPreSaveDto: TransferAbroadPreSaveDto): Observable<ProcessBatchResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}PreSaveTransfer`, transferAbroadPreSaveDto);
  }

  saveTransferDetail(transferAbroadDetailDto: TransferAbroadDetailDto): Observable<ProcessBatchResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}SaveTransferDetail`, transferAbroadDetailDto);
  }

  getTransferAbroad(getTransferAbroadDto: GetTransferAbroadDto): Observable<TransferAbroadResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetTransfer`, getTransferAbroadDto);
  }

  getTransferAbroadDetail(getTransferAbroadDto: GetTransferAbroadDto): Observable<TransferAbroadDetailResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetTransferDetail`, getTransferAbroadDto);
  }

  getDestinationBanks(destinationBankDto: DestinationBanksDto): Observable<DestinationBankResult[]> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetGestinationBanks`, destinationBankDto);
  }

  getParametersASFI(): Observable<ParameterASFIResult[]> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetParametersASFI`, {});
  }

  getTransferFrecuents(): Observable<TransferAbroadFrecuent[]> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetTransfersFrecuent`, {});
  }

  removeFrecuentTransfer(transferAbroadFrecuentDto: TransferAbroadFrecuentDto): Observable<ProcessBatchResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}RemoveFrecuentTransferAbroad`, transferAbroadFrecuentDto);
  }

  getTransfersSwift(transferAbroadSwiftDto: TransferAbroadSwiftDto): Observable<TransferAbroadSwiftListResult> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetTransfersAbroadSwift`, transferAbroadSwiftDto);
  }

  getReportSender(transferAbroadSwiftReportSenderDto: TransferAbroadSwiftReportDto): Observable<Blob> {
    const { transfersService } = this;
    return this.jwt.postReport(`${transfersService}GetReportSender`, transferAbroadSwiftReportSenderDto, { responseType: ResponseContentType.Blob });
  }

  getOperationsReceived(operationReceivedDto: OperationReceivedDto): Observable<OperationReceivedResult[]> {
    const { transfersService } = this;
    return this.jwt.post(`${transfersService}GetOperationsReceivedSwift`, operationReceivedDto);
  }

  getReportReceived(transferAbroadSwiftReportReceivedDto: TransferAbroadSwiftReportReceivedDto): Observable<Blob> {
    const { transfersService } = this;
    return this.jwt.postReport(`${transfersService}GetReportReceived`, transferAbroadSwiftReportReceivedDto, { responseType: ResponseContentType.Blob });
  }
}
