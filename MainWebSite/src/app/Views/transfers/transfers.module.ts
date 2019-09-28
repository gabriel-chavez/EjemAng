import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../Views/shared/shared.module';
import { DirectivesModule } from '../../Directives/directives.module';
import { InternalTransfersComponent } from './internal-transfers/internal-transfers.component';
import { MyAccountsComponent } from './../shared/components/my-accounts/my-accounts.component';
import { SearchAccountsComponent } from './components/search-accounts/search-accounts.component';
import { TransfersRoutingModule } from './transfers-routing.module';
import { TargetAccountsComponent } from './components/target-accounts/target-accounts.component';
import { CurrencyFlagComponent } from './../shared/components/currency-flag/currency-flag.component';
import { ThirdPartyTransfersComponent } from './third-party-transfers/third-party-transfers.component';
import { CurrencyAndAmountComponent } from './../shared/components/currency-and-amount/currency-and-amount.component';
import { FavoriteTransfersComponent } from './components/favorite-transfers/favorite-transfers.component';
import { AuthorizedTransfersComponent } from './authorized-transfers/authorized-transfers.component';
import { TransferAbroadComponent } from './transfer-abroad/transfer-abroad.component';
import { CurrencyAmountAbroadComponent } from './components/currency-amount-abroad/currency-amount-abroad.component';
import { TicketComissionComponent } from './components/ticket-comission/ticket-comission.component';
import { TicketOtherCurrencyComponent } from './components/ticket-other-currency/ticket-other-currency.component';
import { TransferAbroadDetailComponent } from './transfer-abroad-detail/transfer-abroad-detail.component';
import { TermsTransfersAbroadComponent } from './components/terms-transfers-abroad/terms-transfers-abroad.component';
import { FrecuentTransfersAbroadComponent } from './components/frecuent-transfers-abroad/frecuent-transfers-abroad.component';
import { TransferAbroadConfirmComponent } from './transfer-abroad-confirm/transfer-abroad-confirm.component';
import { FrecuentTransferAbroadAddComponent } from './components/frecuent-transfer-abroad-add/frecuent-transfer-abroad-add.component';

@NgModule({
  imports: [
    CommonModule,
    TransfersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
  ],
  declarations: [
    InternalTransfersComponent,
    SearchAccountsComponent,
    TargetAccountsComponent,
    ThirdPartyTransfersComponent,
    FavoriteTransfersComponent,
    AuthorizedTransfersComponent,
    TransferAbroadComponent,
    CurrencyAmountAbroadComponent,
    TicketComissionComponent,
    TicketOtherCurrencyComponent,
    TransferAbroadDetailComponent,
    TermsTransfersAbroadComponent,
    TransferAbroadConfirmComponent,
    FrecuentTransfersAbroadComponent,
    FrecuentTransferAbroadAddComponent]
})
export class TransfersModule { }
