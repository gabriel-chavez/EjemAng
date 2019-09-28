import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { RuatComponent } from './ruat/ruat.component';
import { AfpComponent } from './afp/afp.component'; 

const routes: Routes = [
  { path: 'service-payments', component: ServicePaymentComponent },
  { path: 'ruat', component: RuatComponent },
  { path: 'afp', component: AfpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePaymentsRoutingModule { }
