import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { SalariesPaymentDetail } from '../../../../../Services/mass-payments/Models/salaries-payments/salaries-payment-detail';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { SalariesPaymentsService } from '../../../../../Services/mass-payments/salaries-payments.service';
import { SalariesPaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/salaries-payments/salaries-payments-spreadsheets-result';
import { AccountClientDto } from '../../../../../Services/mass-payments/Models/account-client-dto';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-salaries-payments',
  templateUrl: './form-salaries-payments.component.html',
  styleUrls: ['./form-salaries-payments.component.css'],
  providers: [SalariesPaymentsService]
})
export class FormSalariesPaymentsComponent implements OnInit {
  @Input() detail: SalariesPaymentDetail = new SalariesPaymentDetail();
  @Input() disabled = false;
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  accountVerify: AccountClientDto[] = [];
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  detailPerPage: SalariesPaymentsSpreadsheetsResult[] = [];
  @Output() action = new EventEmitter();
  constants: Constants = new Constants;
  errorCounter = 0;

  constructor(private salariesPaymentsService: SalariesPaymentsService,
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
      this.salariesPaymentsService.getForms(this.requestId)
        .subscribe((response: SalariesPaymentsSpreadsheetsResult[]) => {
          this.isEdit = false;
          this.detail.detail = response;
          this.verifyAccount(this.detail.detail);
          this.utilsService.validateAmountZero(this.detail);
        }, (error) => this.messageService.danger('Fallo en la Obtención de la planilla', error));
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  verifyAccount($event: SalariesPaymentsSpreadsheetsResult[]) {
    for (let i = 0; i < $event.length; i++) {
      this.accountVerify.push($event[i]);
    }
    this.salariesPaymentsService.verificationAccount(this.accountVerify)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (this.utilsService.countErrorsMassivePayments(responseaccount)) {
          for (let i = 0; i < this.detail.detail.length; i++) {
            this.detail.detail[i].telephoneNumber = this.detail.detail[i].telephoneNumber.trim();
            if (responseaccount[i].isOk) {
              this.detail.detail[i].titular = responseaccount[i].titularAccount;
            } else {
              this.detail.detail[i].titular = responseaccount[i].titularAccount;
              this.errorCounter++;
              this.detail.detail[i].isEdit = true;
              if (this.errorCounter <= 5) {
                this.messageService.danger('Fallo en la verificación de cuentas', responseaccount[i].titularAccount + ' ' + '- En la Linea: ' + this.detail.detail[i].line);
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
      }, (error) => this.messageService.warning('Fallo en la verificación de cuentas', error));
  }

  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new SalariesPaymentsSpreadsheetsResult({ isEdit: true }));
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
