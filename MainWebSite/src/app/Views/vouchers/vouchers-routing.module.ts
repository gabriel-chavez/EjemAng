import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwiftComponent } from './swift/swift.component';
import { ElectronicVoucherComponent } from './electronic-voucher/electronic-voucher/electronic-voucher.component';
import { AMonthAgoComponent } from './a-month-ago/a-month-ago.component';
import { TwoMonthsAgoComponent } from './two-months-ago/two-months-ago.component';
import { ThreeMonthsAgoComponent } from './three-months-ago/three-months-ago.component';
import { AYearAgoComponent } from './a-year-ago/a-year-ago.component';
import { CurrentsComponent } from './currents/currents.component';
import { CheckComponent } from './check/check.component';
import { ElectronicBillComponent } from './electronic-bill/electronic-bill.component';
import { VouchersByOperationComponent } from './vouchers-by-operation/vouchers-by-operation.component';

const routes: Routes = [
  { path: 'swift', component: SwiftComponent },
  { path: 'voucherElectronic', component: ElectronicVoucherComponent },
  { path: 'current', component: CurrentsComponent },
  { path: 'aMonthAgo', component: AMonthAgoComponent },
  { path: 'twoMonthsAgo', component: TwoMonthsAgoComponent },
  { path: 'threeMonthsAgo', component: ThreeMonthsAgoComponent },
  { path: 'aYearAgo', component: AYearAgoComponent },
  { path: 'check', component: CheckComponent },
  { path: 'electronicBill', component: ElectronicBillComponent },
  { path: 'vouchersByOperation', component: VouchersByOperationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
