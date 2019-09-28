import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../../Directives/directives.module';
import { MassPaymentsRoutingModule } from './mass-payments-routing.module';
import { CashPaymentsComponent } from './cash-payments/cash-payments.component';
import { StepToFollowComponent } from './components/step-to-follow/step-to-follow.component';
import { DebitForOperationComponent } from './components/debit-for-operation/debit-for-operation.component';
import { ImportFilesComponent } from './components/import-files/import-files.component';
import { LoadPreviousFormComponent } from './components/load-previous-form/load-previous-form.component';
import { DescriptionPaymentComponent } from './components/description-payment/description-payment.component';
import { MultiplePaymentsComponent } from './/multiple-payments/multiple-payments.component';
import { ListOfPaymentsSchedulesComponent } from './components/list-of-payments-schedules/list-of-payments-schedules.component';
import { RowListDetailsCashPaymentComponent } from './components/cash-payments-form/row-list-details-cash-payment/row-list-details-cash-payment.component';
import { FormPaymentsOfAssetsComponent } from './components/multiple-payments-forms/form-payments-of-assets/form-payments-of-assets.component';
import { FormProvidersPaymentsComponent } from './components/multiple-payments-forms/form-providers-payments/form-providers-payments.component';
import { FormCashPaymentsComponent } from './components/multiple-payments-forms/form-cash-payments/form-cash-payments.component';
import { FormAchpaymentsComponent } from './components/multiple-payments-forms/form-achpayments/form-achpayments.component';
import { RowListDetailsAchpaymentComponent } from './components/multiple-payments-forms/row-list-details-achpayment/row-list-details-achpayment.component';
import { RowListDetailsPaymentOfAssetComponent } from './components/multiple-payments-forms/row-list-details-payment-of-asset/row-list-details-payment-of-asset.component';
import { RowListDetailsProvidersPaymentComponent } from './components/multiple-payments-forms/row-list-details-providers-payment/row-list-details-providers-payment.component';
import { RowListDetailsCashPaymentsComponent } from './components/multiple-payments-forms/row-list-details-cash-payments/row-list-details-cash-payments.component';
import { FavoritePaymentsComponent } from './favorite-payments/favorite-payments.component';
import { FavoriteFormsAchpaymentsComponent } from './components/favorite-payments-forms/favorite-forms-achpayments/favorite-forms-achpayments.component';
import { FavoriteFormsCashPaymentsComponent } from './components/favorite-payments-forms/favorite-forms-cash-payments/favorite-forms-cash-payments.component';
import { FavoriteFormsPaymentsOfAssetsComponent } from './components/favorite-payments-forms/favorite-forms-payments-of-assets/favorite-forms-payments-of-assets.component';
import { FavoriteFormsProvidersPaymentsComponent } from './components/favorite-payments-forms/favorite-forms-providers-payments/favorite-forms-providers-payments.component';
import { FavoriteRowListDetailsAchpaymentComponent } from './components/favorite-payments-forms/favorite-row-list-details-achpayment/favorite-row-list-details-achpayment.component';
import { FavoriteRowListDetailsCashPaymentsComponent } from './components/favorite-payments-forms/favorite-row-list-details-cash-payments/favorite-row-list-details-cash-payments.component';
import { FavoriteRowListDetailsProvidersPaymentComponent } from './components/favorite-payments-forms/favorite-row-list-details-providers-payment/favorite-row-list-details-providers-payment.component';
import { FavoriteRowListDetailsPaymentOfAssetComponent } from './components/favorite-payments-forms/favorite-row-list-details-payment-of-asset/favorite-row-list-details-payment-of-asset.component';
import { SalariesPaymentsComponent } from './salaries-payments/salaries-payments.component';
import { FormSalariesPaymentsComponent } from './components/salaries-payments-form/form-salaries-payments/form-salaries-payments.component';
import { RowSalariesPaymentsComponent } from './components/salaries-payments-form/row-salaries-payments/row-salaries-payments.component';
import { ProvidersCheckManagementComponent } from './providers-check-management/providers-check-management.component';
import { RowListDetailsProvidersCheckManagementComponent } from './components/row-list-details-providers-check-management/row-list-details-providers-check-management.component';
import { LoadManualProvidersCheckManagementComponent } from './components/load-manual-providers-check-management/load-manual-providers-check-management.component';
import { LoadPreviousFormProvidersCheckManagementComponent } from './components/load-previous-form-providers-check-management/load-previous-form-providers-check-management.component';
import { ProvidersDepositInOtherBankCheckComponent } from './providers-deposit-in-other-bank-check/providers-deposit-in-other-bank-check.component';
import { LoadManualProvidersDepositInOtherBankCheckComponent } from './components/load-manual-providers-deposit-in-other-bank-check/load-manual-providers-deposit-in-other-bank-check.component';
import { LoadPreviousFormProvidersDepositInOtherBankCheckComponent } from './components/load-previous-form-providers-deposit-in-other-bank-check/load-previous-form-providers-deposit-in-other-bank-check.component';
import { RowListDetailsProvidersDepositInOtherBankCheckComponent } from './components/row-list-details-providers-deposit-in-other-bank-check/row-list-details-providers-deposit-in-other-bank-check.component';
import { TaxPaymentCheckManagementComponent } from './tax-payment-check-management/tax-payment-check-management.component';
import { ListDetailPaymentsComponent } from './components/list-detail-payments/list-detail-payments/list-detail-payments.component';
import { RowListDetailPaymentsComponent } from './components/list-detail-payments/row-list-detail-payments/row-list-detail-payments.component';
import { PaymentBankAchComponent } from './payment-bank-ach/payment-bank-ach.component';
import { RowPaymentAchComponent } from './components/payment-bank-ach/row-payment-ach/row-payment-ach.component';
import { FormSingleCashPaymentsComponent } from './components/cash-payments-form/form-single-cash-payments/form-single-cash-payments.component';
import { ProvidersPaymentsComponent } from './providers-payments/providers-payments.component';
import { PaymentDebitOrdersAchComponent } from './payment-debit-orders-ach/payment-debit-orders-ach.component';
import { RowPaymentOddAchComponent } from './components/payment-debit-orders-ach/row-payment-odd-ach/row-payment-odd-ach.component';
import { FormSingleOddAchComponent } from './components/payment-debit-orders-ach/form-single-odd-ach/form-single-odd-ach.component';
import { FormSingleAchComponent } from './components/payment-bank-ach/form-single-ach/form-single-ach.component';
import { TextNormalComponent } from './components/payment-debit-orders-ach/text-normal/text-normal.component';
import { RowProvidersPaymentsComponent } from './components/providers-payments-form/row-providers-payments/row-providers-payments.component';
import { FormSingleProvidersPaymentsComponent } from './components/providers-payments-form/form-single-providers-payments/form-single-providers-payments.component';
import { LoadPreviousFormPaymentsCheckComponent } from './components/load-previous-form-payments-check/load-previous-form-payments-check.component';
import { FormAccountClientComponent } from './components/payment-bank-ach/form-account-client/form-account-client.component';


@NgModule({
  imports: [
    CommonModule,
    MassPaymentsRoutingModule,
    FormsModule,
    SharedModule,
    DirectivesModule,
  ],
  declarations: [
    CashPaymentsComponent,
    StepToFollowComponent,
    DebitForOperationComponent,
    ImportFilesComponent,
    LoadPreviousFormComponent,
    RowListDetailsCashPaymentComponent,
    DescriptionPaymentComponent,
    MultiplePaymentsComponent,
    ListOfPaymentsSchedulesComponent,
    FormPaymentsOfAssetsComponent,
    FormProvidersPaymentsComponent,
    FormCashPaymentsComponent,
    FormAchpaymentsComponent,
    RowListDetailsAchpaymentComponent,
    RowListDetailsPaymentOfAssetComponent,
    RowListDetailsProvidersPaymentComponent,
    RowListDetailsCashPaymentsComponent,
    FavoritePaymentsComponent,
    FavoriteFormsAchpaymentsComponent,
    FavoriteFormsCashPaymentsComponent,
    FavoriteFormsPaymentsOfAssetsComponent,
    FavoriteFormsProvidersPaymentsComponent,
    FavoriteRowListDetailsAchpaymentComponent,
    FavoriteRowListDetailsCashPaymentsComponent,
    FavoriteRowListDetailsProvidersPaymentComponent,
    FavoriteRowListDetailsPaymentOfAssetComponent,
    SalariesPaymentsComponent,
    FormSalariesPaymentsComponent,
    ProvidersCheckManagementComponent,
    RowListDetailsProvidersCheckManagementComponent,
    LoadManualProvidersCheckManagementComponent,
    LoadPreviousFormProvidersCheckManagementComponent,
    RowSalariesPaymentsComponent,
    PaymentBankAchComponent,
    RowPaymentAchComponent,
    ProvidersDepositInOtherBankCheckComponent,
    LoadManualProvidersDepositInOtherBankCheckComponent,
    LoadPreviousFormProvidersDepositInOtherBankCheckComponent,
    RowListDetailsProvidersDepositInOtherBankCheckComponent,
    TaxPaymentCheckManagementComponent,
    ListDetailPaymentsComponent,
    RowListDetailPaymentsComponent,
    FormSingleCashPaymentsComponent,
    ProvidersPaymentsComponent,
    PaymentDebitOrdersAchComponent,
    RowPaymentOddAchComponent,
    FormSingleOddAchComponent,
    FormSingleAchComponent,
    TextNormalComponent,
    RowProvidersPaymentsComponent,
    FormSingleProvidersPaymentsComponent,
    LoadPreviousFormPaymentsCheckComponent,
    FormAccountClientComponent
  ],
  exports : [
  StepToFollowComponent,
  ImportFilesComponent,
  ListOfPaymentsSchedulesComponent,
  ]
})
export class MassPaymentsModule { }
