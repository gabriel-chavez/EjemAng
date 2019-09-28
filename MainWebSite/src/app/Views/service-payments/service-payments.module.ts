import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePaymentsRoutingModule } from './service-payments-routing.module';
import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ClientCodeComponent } from './components/client-code/client-code.component';
import { TelephonyComponent } from './components/telephony/telephony.component';
import { DebtDetailComponent } from './components/debt-detail/debt-detail.component';
import { SendBillComponent } from './components/send-bill/send-bill.component';
import { RuatComponent } from './ruat/ruat.component';
import { RuatRequestFormComponent } from './components/ruat-request-form/ruat-request-form.component';
import { RuatDebtDetailComponent } from './components/ruat-debt-detail/ruat-debt-detail.component';
import {AfpComponent} from './afp/afp.component';
import {AfpDebtDetailComponent} from './components/afp-debt-detail/afp-debt-detail.component';
import {AfpRequestFormComponent} from './components/afp-request-form/afp-request-form.component';

@NgModule({
  imports: [
    CommonModule,
    ServicePaymentsRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ServicePaymentComponent, ServiceListComponent, ClientCodeComponent, TelephonyComponent, DebtDetailComponent, SendBillComponent, RuatComponent, RuatRequestFormComponent, RuatDebtDetailComponent,AfpComponent,AfpDebtDetailComponent,AfpRequestFormComponent]
})
export class ServicePaymentsModule { }
