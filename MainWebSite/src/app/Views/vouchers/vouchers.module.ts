import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../Directives/directives.module';
import { VouchersRoutingModule } from './vouchers-routing.module';
import { SwiftComponent } from './swift/swift.component';
import { SharedModule } from '../shared/shared.module';
import { FilterTypeTransfersComponent } from './components/filter-type-transfers/filter-type-transfers.component';
import { ListSwiftSentComponent } from './components/list-swift-sent/list-swift-sent.component';
import { ListSwiftReceivedComponent } from './components/list-swift-received/list-swift-received.component';
import { ElectronicVoucherComponent } from './electronic-voucher/electronic-voucher/electronic-voucher.component';
import { RangeDatePickerComponent } from './electronic-voucher/components/range-date-picker/range-date-picker.component';
import { TableElectronicVoucherComponent } from './electronic-voucher/components/table-electronic-voucher/table-electronic-voucher.component';
import { CurrentsComponent } from './currents/currents.component';
import { AMonthAgoComponent } from './a-month-ago/a-month-ago.component';
import { TwoMonthsAgoComponent } from './two-months-ago/two-months-ago.component';
import { ThreeMonthsAgoComponent } from './three-months-ago/three-months-ago.component';
import { AYearAgoComponent } from './a-year-ago/a-year-ago.component';
import { ListVoucherOperationComponent } from './components/list-voucher-operation/list-voucher-operation.component';
import { FilterVoucherOperationComponent } from './components/filter-voucher-operation/filter-voucher-operation.component';
import { CheckComponent } from './check/check.component';
//import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ListCheckSentComponent } from './components/list-check-sent/list-check-sent.component';
import { ElectronicBillComponent } from './electronic-bill/electronic-bill.component';
import { VouchersByOperationComponent } from './vouchers-by-operation/vouchers-by-operation.component';
import { VouchersListComponent } from './components/vouchers-list/vouchers-list.component';


@NgModule({
  imports: [
    CommonModule,
    VouchersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SwiftComponent,
    FilterTypeTransfersComponent,
    ListSwiftSentComponent,
    ListSwiftReceivedComponent,
    ElectronicVoucherComponent,
    RangeDatePickerComponent,
    TableElectronicVoucherComponent,
    AMonthAgoComponent,
    TwoMonthsAgoComponent,
    ThreeMonthsAgoComponent,
    CurrentsComponent,
    AYearAgoComponent,
    ListVoucherOperationComponent,
    FilterVoucherOperationComponent,
    CheckComponent,
    ListCheckSentComponent,
    ElectronicBillComponent,
    VouchersByOperationComponent,
    VouchersListComponent
  ]
})
export class VouchersModule { }
