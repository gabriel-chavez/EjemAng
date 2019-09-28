import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalTransfersComponent } from './internal-transfers/internal-transfers.component';
import { ThirdPartyTransfersComponent } from './third-party-transfers/third-party-transfers.component';
import { AuthorizedTransfersComponent } from './authorized-transfers/authorized-transfers.component';
import { TransferAbroadComponent } from './transfer-abroad/transfer-abroad.component';
import { TransferAbroadDetailComponent } from './transfer-abroad-detail/transfer-abroad-detail.component';
import { TransferAbroadConfirmComponent } from './transfer-abroad-confirm/transfer-abroad-confirm.component';

const routes: Routes = [
  { path: 'third-party', component: ThirdPartyTransfersComponent },
  { path: 'internal', component: InternalTransfersComponent },
  { path: 'authorized', component: AuthorizedTransfersComponent },
  { path: 'transfer-abroad', component: TransferAbroadComponent },
  { path: 'transfer-abroad-confirm', component: TransferAbroadConfirmComponent },
  { path: 'transfer-abroad-detail', component: TransferAbroadDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { }
