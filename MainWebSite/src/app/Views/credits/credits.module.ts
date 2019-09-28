import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../Directives/directives.module';


import { CreditsRoutingModule } from './credits-routing.module';
import { QuotaPaymentComponent } from './quota-payment/quota-payment.component';
import { SharedModule } from '../shared/shared.module';
import { QuotaPaymentDetailComponent } from './components/quota-payment-detail/quota-payment-detail.component';
import { QuotaVouchersComponent } from './quota-vouchers/quota-vouchers.component';
import { DisbursementVouchersComponent } from './disbursement-vouchers/disbursement-vouchers.component';
import { PaymentPlansComponent } from './payment-plans/payment-plans.component';

@NgModule({
  imports: [
    CommonModule,
    CreditsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    SharedModule,
  ],
  declarations: [
    QuotaPaymentComponent,
    QuotaPaymentDetailComponent,
    QuotaVouchersComponent,
    DisbursementVouchersComponent,
    PaymentPlansComponent
  ]
})
export class CreditsModule { }
