import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultQuotaResult } from '../../../../Services/credits/models/consult-quota-result';
import { CreditsService } from '../../../../Services/credits/credits.service';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../../Services/shared/enums/account-use';
import { OperationType } from '../../../../Services/shared/enums/operation-type';
import { Roles } from '../../../../Services/shared/enums/roles';
import { ProcessBatchDto } from '../../../../Services/shared/models/process-batch';
import { ConsultQuotaDto } from '../../../../Services/credits/models/consult-quota-dto';
import { AccountResult } from '../../../../Services/accounts/models/account-result';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-quota-payment-detail',
  templateUrl: './quota-payment-detail.component.html',
  styleUrls: ['./quota-payment-detail.component.css'],
  providers: [CreditsService]
})
export class QuotaPaymentDetailComponent implements OnInit {

  quota: ConsultQuotaResult = new ConsultQuotaResult();
  quotaSelected: ConsultQuotaResult = new ConsultQuotaResult();
  creditAccountRequest: AccountDto = new AccountDto();
  accountSelected: AccountResult = new AccountResult();
  processBatchDto: ProcessBatchDto = new ProcessBatchDto();
  typesCredit: string[] = ['A'];
  isPayment = false;
  validate = false;
  validateSubmit = false;
  @Input() disabled = false;
  @Output() onSelected = new EventEmitter<ConsultQuotaResult>();

  constructor(private creditsService: CreditsService, private globalService: GlobalService) { }

  ngOnInit() {
    this.creditAccountRequest = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      operationTypeId: [OperationType.pagoDeServicios],
      roleId: Roles.consultant,
      types: this.typesCredit
    });
  }

  handleCheckPayment() {
    if (this.isPayment) {
      this.quotaSelected = this.quota;
      this.quotaSelected.accountId = this.accountSelected.id;
    } else {
      this.quotaSelected = new ConsultQuotaResult();
    }
    this.onSelected.emit(this.quotaSelected);
  }

  handleAccountChanged($event: AccountResult) {
    this.accountSelected = $event;
  }

  handleSearchQuota() {
    this.validate = true;
    this.isPayment = false;
    this.quotaSelected = new ConsultQuotaResult();

    if (this.accountSelected.number) {
      const dto: ConsultQuotaDto = new ConsultQuotaDto();
      dto.account = this.accountSelected.number;
      this.creditsService.getQuotaPayment(dto)
        .subscribe((res: ConsultQuotaResult) => {
          this.quota = res;
        }, error => {
          this.globalService.danger('Error en el servicio', error.message);
          console.log(error);
        });
    }
  }

  handleValidate() {
    this.validate = true;
    this.validateSubmit = true;
    if (this.accountSelected.number && this.quotaSelected.amount) {
      return true;
    }
    return false;
  }
}
