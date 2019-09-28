import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProvidersPaymentDetail } from '../../../../../Services/mass-payments/Models/providers-payments/providers-payment-detail';
import { AccountProviderDto } from '../../../../../Services/mass-payments/Models/account-provider-dto';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { ProvidersPaymentsService } from '../../../../../Services/mass-payments/providers-payments.service';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { ProvidersPaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/providers-payments/providers-payments-spreadsheets-result';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-single-providers-payments',
  templateUrl: './form-single-providers-payments.component.html',
  styleUrls: ['./form-single-providers-payments.component.css'],
  providers: [ProvidersPaymentsService, UtilsService]
})
export class FormSingleProvidersPaymentsComponent implements OnInit {

  @Input() detail: ProvidersPaymentDetail = new ProvidersPaymentDetail();
  @Input() disabled = false;
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  accountVerify: AccountProviderDto[] = [];
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  @Output() action = new EventEmitter();
  constants: Constants = new Constants;
  errorCounter = 0;
  detailPerPage: ProvidersPaymentsSpreadsheetsResult [] = [];

  constructor(private providersPaymentsService: ProvidersPaymentsService,
    private messageService: GlobalService, private utilsService: UtilsService) {
  }

  ngOnInit() {
    if (this.requestId.id === undefined) {
      if (this.detail.detail.length !== 0) {
        this.verifyAccount(this.detail.detail);
        this.utilsService.validateAmountZero(this.detail);
      } else {
        this.handleNewRow();
      }
    } else {
      this.getDetailList();
    }
  }

  getDetailList() {
    if (this.requestId !== undefined) {
      this.providersPaymentsService.getForms(this.requestId)
        .subscribe((response: ProvidersPaymentsSpreadsheetsResult[]) => {
          this.isEdit = false;
          this.detail.detail = response;
          this.verifyAccount(this.detail.detail);
          this.utilsService.validateAmountZero(this.detail);
        }, (error) => this.messageService.warning('Fallo en la Obtención de la planilla', error));
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  verifyAccount($event: ProvidersPaymentsSpreadsheetsResult[]) {
    for (let i = 0; i < $event.length; i++) {
      this.accountVerify.push($event[i]);
    }

    this.providersPaymentsService.verificationAccount(this.accountVerify)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (this.utilsService.countErrorsMassivePayments(responseaccount)) {
        for (let i = 0; i < this.detail.detail.length; i++) {
          if (responseaccount[i].isOk) {
            this.detail.detail[i].titular = responseaccount[i].titularAccount;
          } else {
            this.detail.detail[i].titular = responseaccount[i].titularAccount;
            this.errorCounter++;
            this.detail.detail[i].isEdit = true;
            if (this.errorCounter <= 5) {
              this.messageService.danger('Fallo en la verificación de cuentas', responseaccount[i].titularAccount + ' '
                + '- En la linea' + this.detail.detail[i].line);
            }
          }
        }
        if (this.errorCounter === 0) {
          for (let i = 0; i < this.detail.detail.length; i++) {
            this.detail.totalamount += +this.detail.detail[i].amount;
          }
          this.action.emit(this.detail);
        } else if (this.errorCounter >= 6) {
          this.messageService.danger('Fallo en la verificación de cuentas:', ' Varias cuentas incorrectas verifique porfavor');
        }
      } else {
        this.detail.detail = [];
        this.messageService.danger('Error en la planilla', ' los pagos sobrepasaron la cantidad maxima de 10 errores por planilla y por tanto no seran válidos');
      }

      }, (error) => this.messageService.danger('Fallo en la verificación de cuentas', error));
  }

  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new ProvidersPaymentsSpreadsheetsResult({ isEdit: true }));
  }

  handleActionRow($event) {
    this.index = this.detail.detail.indexOf($event.data);
    switch ($event.action) {
      case 'accept':
        this.detail.detail[this.index] = $event.data;
        this.detail.totalamount = 0;
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.isDisableAdd = false;
        this.action.emit(this.detail);
        this.detail.totalamount = 0;
        break;
      case 'delete':
        this.detail.detail.splice(this.index, 1);
        this.detail.totalamount = 0;
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.action.emit(this.detail);
        break;
      case 'edit':
        this.detail.totalamount = 0;
        this.isDisableAdd = true;
        break;
      case 'cancel':
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.isDisableAdd = false;
        this.detail.totalamount = 0;
        break;
    }
  }
}

