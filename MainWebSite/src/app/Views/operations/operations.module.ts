import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../../Directives/directives.module';
import { FavoritePaymentsSettingsComponent } from './favorite-payments-settings/favorite-payments-settings.component';
import { FormAchpaymentsComponent } from './components/form-favorite-payments/form-achpayments/form-achpayments.component';
import { FormCashPaymentsComponent } from './components/form-favorite-payments/form-cash-payments/form-cash-payments.component';
import { FormPaymentsOfAssetsComponent } from './components/form-favorite-payments/form-payments-of-assets/form-payments-of-assets.component';
import { FormProvidersPaymentsComponent } from './components/form-favorite-payments/form-providers-payments/form-providers-payments.component';
import { RowListDetailsAchpaymentComponent } from './components/form-favorite-payments/row-list-details-achpayment/row-list-details-achpayment.component';
import { RowListDetailsCashPaymentsComponent } from './components/form-favorite-payments/row-list-details-cash-payments/row-list-details-cash-payments.component';
import { RowListDetailsPaymentOfAssetComponent } from './components/form-favorite-payments/row-list-details-payment-of-asset/row-list-details-payment-of-asset.component';
import { RowListDetailsProvidersPaymentComponent } from './components/form-favorite-payments/row-list-details-providers-payment/row-list-details-providers-payment.component';
import { MassPaymentsModule } from '../mass-payments/mass-payments.module';
import { ClaimRequestComponent } from './claim-request/claim-request.component';
import { BallotOfWarrantyComponent } from './ballot-of-warranty/ballot-of-warranty.component';
import { SecuringDataComponent } from './components/securing-data/securing-data.component';
import { BailDataComponent } from './components//bail-data/bail-data.component';
import { RoedataComponent } from './components/roedata/roedata.component';
import { OthersComponent } from './components/others/others.component';
import { DeliveryInstructionsComponent } from './components/delivery-instructions/delivery-instructions.component';
import { VouchersModule } from '../vouchers/vouchers.module';
import { GradualAmortizationComponent } from './components//gradual-amortization/gradual-amortization.component';
import { AutoDisbursementComponent } from './auto-disbursement/auto-disbursement.component';
import { SelectTypeBallotComponent } from './components/select-type-ballot/select-type-ballot.component';
import { ModificationRequestComponent } from './modification-request/modification-request.component';
import { OthersOfBallotComponent } from './components/others-of-ballot/others-of-ballot.component';

@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    FormsModule,
    SharedModule,
    DirectivesModule,
    MassPaymentsModule,
    VouchersModule,
  ],
  declarations: [
    FavoritePaymentsSettingsComponent,
    FormAchpaymentsComponent,
    FormCashPaymentsComponent,
    FormPaymentsOfAssetsComponent,
    FormProvidersPaymentsComponent,
    RowListDetailsAchpaymentComponent,
    RowListDetailsCashPaymentsComponent,
    RowListDetailsPaymentOfAssetComponent,
    RowListDetailsProvidersPaymentComponent,
    ClaimRequestComponent,
    BallotOfWarrantyComponent,
    SecuringDataComponent,
    BailDataComponent,
    RoedataComponent,
    OthersComponent,
    DeliveryInstructionsComponent,
    GradualAmortizationComponent,
    AutoDisbursementComponent,
    SelectTypeBallotComponent,
    ModificationRequestComponent,
    OthersOfBallotComponent
  ]
})
export class OperationsModule { }
