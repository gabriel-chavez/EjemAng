import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashPaymentsComponent } from './cash-payments/cash-payments.component';
import { MultiplePaymentsComponent } from './multiple-payments/multiple-payments.component';
import { FavoritePaymentsComponent } from './favorite-payments/favorite-payments.component';
import { SalariesPaymentsComponent } from './salaries-payments/salaries-payments.component';
import { ProvidersCheckManagementComponent } from './providers-check-management/providers-check-management.component';
import { ProvidersDepositInOtherBankCheckComponent} from './providers-deposit-in-other-bank-check/providers-deposit-in-other-bank-check.component';
import { TaxPaymentCheckManagementComponent } from './tax-payment-check-management/tax-payment-check-management.component';
import { PaymentBankAchComponent } from './payment-bank-ach/payment-bank-ach.component';
import { ProvidersPaymentsComponent } from './providers-payments/providers-payments.component';
import { PaymentDebitOrdersAchComponent } from './payment-debit-orders-ach/payment-debit-orders-ach.component';

const routes: Routes = [
  { path: 'cashPayments', component: CashPaymentsComponent },
  { path: 'multiplePayments', component: MultiplePaymentsComponent},
  { path: 'favoritePayments', component: FavoritePaymentsComponent},
  { path: 'salariesPayments', component: SalariesPaymentsComponent},
  { path: 'providersCheckManagement', component: ProvidersCheckManagementComponent},
  { path: 'providersDepositInOtherBankCheck', component: ProvidersDepositInOtherBankCheckComponent},
  { path: 'taxPaymentCheckManagement', component: TaxPaymentCheckManagementComponent },
  { path: 'providersPayments', component: ProvidersPaymentsComponent},
  { path: 'PaymentsACH', component: PaymentBankAchComponent },
  { path: 'PaymentsOddACH', component: PaymentDebitOrdersAchComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MassPaymentsRoutingModule { }
