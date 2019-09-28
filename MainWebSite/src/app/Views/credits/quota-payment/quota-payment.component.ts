import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { Roles } from '../../../Services/shared/enums/roles';
import { AccountResult } from '../../../Services/accounts/models/account-result';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { QuotaPaymentDto } from '../../../Services/credits/models/quota-payment-dto';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { ConsultQuotaResult } from '../../../Services/credits/models/consult-quota-result';
import { GlobalService } from '../../../Services/shared/global.service';
import { CreditsService } from '../../../Services/credits/credits.service';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { Router } from '@angular/router';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersService } from '../../../Services/approvers-and-controllers/approversandcontrollers.service';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-quota-payment',
  templateUrl: './quota-payment.component.html',
  styleUrls: ['./quota-payment.component.css'],
  providers: [CreditsService]
})
export class QuotaPaymentComponent implements OnInit {

  quotaPaymentDto: QuotaPaymentDto = new QuotaPaymentDto();
  sourceAccountRequest: AccountDto = new AccountDto();
  approversRequest = new InputApprovers();
  types: string[] = ['P'];
  isDisabledForm = false;
  isTokenFormDisabled = false;
  amountCredit = 0;
  isPayerSuccessful = false;
  isVisibleToken = false;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private globalService: GlobalService, private creditsService: CreditsService) {
    this.sourceAccountRequest = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      operationTypeId: [OperationType.pagoCreditoEmpresarial],
      roleId: Roles.initiator,
      types: this.types
    });
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.quotaPaymentDto.sourceAccountId = $event.id;
    this.quotaPaymentDto.sourceAccount = $event.number;
    this.quotaPaymentDto.sourceCurrency = $event.currency;
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoCreditoEmpresarial,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.quotaPaymentDto.controllers = $event.controllers;
    this.quotaPaymentDto.approvers = $event.approvers;
    this.quotaPaymentDto.cismartApprovers = $event.cismartApprovers;
  }

  handleEmails($event: EmailInputModel) {
    this.quotaPaymentDto.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleQuotaSelected($event: ConsultQuotaResult) {
    this.quotaPaymentDto.amount = $event.amount;
    this.quotaPaymentDto.currency = $event.currency;
    this.quotaPaymentDto.accountId = $event.accountId;
    this.quotaPaymentDto.expirationDate = $event.expirationDate;
    // this.quotaPaymentDto.date = $event.expirationDate;
  }

  validate(sourceAccount: boolean, emailInput: boolean, approversAndControllers: boolean, validateApproversLimit: boolean, quota: boolean) {
    const validation = sourceAccount && emailInput && approversAndControllers && validateApproversLimit && quota;
    if (validation) {
      if (this.quotaPaymentDto.sourceCurrency === this.quotaPaymentDto.currency) {
        return true;
      } else {
        this.globalService.danger('Error de Validación', 'Las monedas de las cuentas deben ser iguales');
      }
    }
    return false;
  }

  handleShowToken() {
    this.approversComponent.validationCismart()
      .subscribe(res => {
        if (res) {
          this.isVisibleToken = true;
        }
      });
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.quotaPaymentDto.tokenCode = $event.code;
    this.quotaPaymentDto.tokenName = $event.name;
    this.savePayer();
  }

  savePayer() {
    const { quotaPaymentDto } = this;
    this.isTokenFormDisabled = true;
    quotaPaymentDto.operationTypeId = OperationType.pagoCreditoEmpresarial;
    this.creditsService.saveQuotaPayment(quotaPaymentDto)
      .subscribe((res: ProcessBatchResult) => {
        if (res.processBatchId > 0) {
          this.isDisabledForm = true;
          this.isPayerSuccessful = true;
          this.globalService.success('Operación realizada', `Su operación ha sido enviada satisfactoriamente a Solicitudes Pendientes de Autorización, desde donde el o los usuario(s) que cuenten con los permisos podrán autorizar el lote ${res.processBatchId} más adelante. Una vez aprobada su operación, es muy importante que pueda verificar en la pantalla de “Seguimiento” hasta comprobar que su operación se procesó correctamente.`, true);
        } else {
          this.globalService.danger('Error al procesar', 'Ocurrio un error al guardar, por favor intente de nuevo o comuniquese con el administrador del sistema');
        }
        this.isVisibleToken = false;
        this.isTokenFormDisabled = false;
      }, error => {
        this.globalService.danger('Error al procesar', error);
        this.isVisibleToken = false;
        this.isTokenFormDisabled = false;
      });
  }

}
