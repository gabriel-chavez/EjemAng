import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FavoritePaymentsData } from '../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-data';
import { FavoritePaymentsService } from '../../../../Services/mass-payments/favorite-payments.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';

@Component({
  selector: 'app-configuration-favorite-payment-detail',
  templateUrl: './configuration-favorite-payment-detail.component.html',
  styleUrls: ['./configuration-favorite-payment-detail.component.css'],
  providers: [FavoritePaymentsService]
})
export class ConfigurationFavoritePaymentDetailComponent implements OnInit {

  @Input() batchId: number;
  detail: FavoritePaymentsData = new FavoritePaymentsData();
  payments: FavoritePaymentsData = new FavoritePaymentsData();
  isVisibleAch: boolean;
  isVisibleCash: boolean;
  isVisibleProviders: boolean;
  isVisibleSalaries: boolean;
  constructor(private favoritePaymentsService: FavoritePaymentsService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.favoritePaymentsService.getDetailMassFavorite(new MassivePaymentsSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.detail.speeadsheet.formAchPayments.length > 0 ? this.isVisibleAch = true : this.isVisibleAch = false;
        this.detail.speeadsheet.formCashPayments.length > 0 ? this.isVisibleCash = true : this.isVisibleCash = false;
        this.detail.speeadsheet.formProvidersPayments.length > 0 ? this.isVisibleProviders = true : this.isVisibleProviders = false;
        this.detail.speeadsheet.formSalariesPayments.length > 0 ? this.isVisibleSalaries = true : this.isVisibleSalaries = false;
      }, (error) => this.globalService.danger('No se pudo obtener el Detalle', error.message));
  }

  handlePageChangedSalaries($event: number) {
    this.payments.speeadsheet.formSalariesPayments = this.detail.speeadsheet.formSalariesPayments.slice((($event - 1) * 3), 3 * $event);
  }

  handlePageChangedProviders($event: number) {
    this.payments.speeadsheet.formProvidersPayments = this.detail.speeadsheet.formProvidersPayments.slice((($event - 1) * 3), 3 * $event);
  }

  handlePageChangedCash($event: number) {
    this.payments.speeadsheet.formCashPayments = this.detail.speeadsheet.formCashPayments.slice((($event - 1) * 3), 3 * $event);
  }

  handlePageChangedAch($event: number) {
    this.payments.speeadsheet.formAchPayments = this.detail.speeadsheet.formAchPayments.slice((($event - 1) * 3), 3 * $event);
  }
}
