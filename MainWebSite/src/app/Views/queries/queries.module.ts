import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BalancesListComponent } from './components/balances-list/balances-list.component';
import { BatchDetailComponent } from './components/batch-detail/batch-detail.component';
import { BatchStatusComponent } from './components/batch-status/batch-status.component';
import { FilterPaseComponent } from './components/filter-pase/filter-pase.component';
import { GenerateBodyComponent } from './components/generate-body/generate-body.component';
import { GenerateEndComponent } from './components/generate-end/generate-end.component';
import { GenerateHeadComponent } from './components/generate-head/generate-head.component';
import { ListPaseComponent } from './components/list-pase/list-pase.component';
import { MovementsListComponent } from './components/movements-list/movements-list.component';
import { PendingBatchListComponent } from './components/pending-batch-list/pending-batch-list.component';
import { SearchCreditCardsMovementsPerMonthComponent } from './components/search-credit-cards-movements-per-month/search-credit-cards-movements-per-month.component';
import { SearchCreditCardsComponent } from './components/search-credit-cards/search-credit-cards.component';
import { TransferBatchDetailComponent } from './components/transfer-batch-detail/transfer-batch-detail.component';
import { CreditCardsMovementsComponent } from './credit-cards-movements/credit-cards-movements.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { DetailPaseComponent } from './detail-pase/detail-pase.component';
import { HistoricalAccountsComponent } from './historical-accounts/historical-accounts.component';
import { IdentificationDepositsComponent } from './identification-deposits/identification-deposits.component';
import { MovementsAndBalancesComponent } from './movements-and-balances/movements-and-balances.component';
import { PaseComponent } from './pase/pase.component';
import { PendingsComponent } from './pendings/pendings.component';
import { QueriesRoutingModule } from './queries-routing.module';
import { ServicePaymentBatchDetailComponent } from './components/service-payment-batch-detail/service-payment-batch-detail.component';
import { TransferAbroadBatchDetailComponent } from './components/transfer-abroad-batch-detail/transfer-abroad-batch-detail.component';
import { TransferAbroadFormBatchDetailComponent } from './components/transfer-abroad-form-batch-detail/transfer-abroad-form-batch-detail.component';
import { CashPaymentDetailComponent } from './components/cash-payment-detail/cash-payment-detail.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingListComponent } from './components/tracking-list/tracking-list.component';
import { SalariesPaymentsDetailComponent } from './components/salaries-payments-detail/salaries-payments-detail.component';
import { ProvidersPaymentDetailComponent } from './components/providers-payment-detail/providers-payment-detail.component';
import { MultiplePaymentsDetailComponent } from './components/multiple-payments-detail/multiple-payments-detail.component';
import { PaymentBankAchDetailComponent } from './components/payment-bank-ach-detail/payment-bank-ach-detail.component';
import { PaymentAchOddDetailComponent } from './components/payment-ach-odd-detail/payment-ach-odd-detail.component';
import { ProvidersCheckManagementDetailComponent } from './components/providers-check-management-detail/providers-check-management-detail.component';
import { ProvidersDepositOtherBankChecksDetailComponent } from './components/providers-deposit-other-bank-checks-detail/providers-deposit-other-bank-checks-detail.component';
import { PaymentTaxCheckDetailComponent } from './components/payment-tax-check-detail/payment-tax-check-detail.component';
import { FavoritePaymentsDetailComponent } from './components/favorite-payments-detail/favorite-payments-detail.component';
import { ConfigurationFavoritePaymentDetailComponent } from './components/configuration-favorite-payment-detail/configuration-favorite-payment-detail.component';
import { PaymentAfpDetailComponent } from './components/payment-afp-detail/payment-afp-detail.component';
import { QuotaPaymentDetailComponent } from './components/quota-payment-detail/quota-payment-detail.component';


@NgModule({
  imports: [
    CommonModule,
    QueriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BalancesListComponent,
    MovementsAndBalancesComponent,
    MovementsListComponent,
    SearchCreditCardsComponent,
    CreditCardsMovementsComponent,
    CreditCardsComponent,
    SearchCreditCardsMovementsPerMonthComponent,
    HistoricalAccountsComponent,
    GenerateBodyComponent,
    GenerateHeadComponent,
    GenerateEndComponent,
    IdentificationDepositsComponent,
    PaseComponent,
    FilterPaseComponent,
    DetailPaseComponent,
    ListPaseComponent,
    PendingsComponent,
    PendingBatchListComponent,
    TransferBatchDetailComponent,
    BatchDetailComponent,
    BatchStatusComponent,
    ServicePaymentBatchDetailComponent,
    TransferAbroadBatchDetailComponent,
    TransferAbroadFormBatchDetailComponent,
    CashPaymentDetailComponent,
    TrackingComponent,
    TrackingListComponent,
    SalariesPaymentsDetailComponent,
    ProvidersPaymentDetailComponent,
    MultiplePaymentsDetailComponent,
    PaymentBankAchDetailComponent,
    PaymentAchOddDetailComponent,
    ProvidersCheckManagementDetailComponent,
    ProvidersDepositOtherBankChecksDetailComponent,
    PaymentTaxCheckDetailComponent,
    FavoritePaymentsDetailComponent,
    ConfigurationFavoritePaymentDetailComponent,
    PaymentAfpDetailComponent,
    QuotaPaymentDetailComponent,
]
})
export class QueriesModule { }
