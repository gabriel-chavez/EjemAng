import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetDebtRequest } from '../../../../Services/service-payments/models/get-debt-request';
import { GetFavorites } from '../../../../Services/service-payments/models/get-favorites';
import { ServicePaymentsService } from '../../../../Services/service-payments/service-payments.service';
import { ServiceTypes } from '../../../../Services/shared/enums/service-types';
import { GlobalService } from '../../../../Services/shared/global.service';
import { FavoritePayment } from '../../../../Services/shared/models/favorite-payment';

@Component({
  selector: 'app-client-code',
  templateUrl: './client-code.component.html',
  styleUrls: ['./client-code.component.css'],
  providers: [ServicePaymentsService]
})
export class ClientCodeComponent implements OnInit, OnChanges {

  getDebtRequest: GetDebtRequest;
  errorMessage: string = '';
  serviceTypes = ServiceTypes;
  isFavorite: boolean;
  favorites: FavoritePayment[];
  selectedFavorite: FavoritePayment;
  @Input() service: string;
  @Input() visible: boolean;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<any>;
  @Output() onNewSearch: EventEmitter<any>;
  @Output() onCheckedChange: EventEmitter<boolean>;
  @ViewChild('clientCodeForm') form: NgForm;

  constructor(private servicePayment: ServicePaymentsService, private globalService: GlobalService) {
    this.getDebtRequest = new GetDebtRequest();
    this.onChange = new EventEmitter();
    this.onCheckedChange = new EventEmitter();
    this.onNewSearch = new EventEmitter();
    this.favorites = [];
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDebtRequest.service = this.service;
    if (changes.service !== undefined && !changes.service.isFirstChange()) {
      this.getDebtRequest.code = '';
      this.isFavorite = false;
    }
  }

  getDebt() {
    this.onNewSearch.emit();
    this.servicePayment
      .getDebts(this.getDebtRequest)
      .subscribe((response: any) => {
        this.onChange.emit(response);
      }, error => {
        this.errorMessage = error;
        this.getDebtRequest.code = '';
      });
  }

  getFavorites() {
    this.servicePayment
      .getFavorites(new GetFavorites({ serviceType: this.service }))
      .subscribe((response: FavoritePayment[]) => {
        this.favorites = response;
        this.selectedFavorite = this.favorites[0];
        this.getDebtRequest.code = this.selectedFavorite.code;
      }, error => {
        this.errorMessage = error;
        this.isFavorite = false;
      });
  }

  handleFavoriteListChanged() {
    this.getDebtRequest.code = this.selectedFavorite.code;
  }

  handleSearchFavoritesChanged() {
    if (this.isFavorite) {
      this.getFavorites();
    }
    else {
      this.onCheckedChange.emit(this.isFavorite);
      this.getDebtRequest.code = '';
    }
  }

  handleValidate() {
    if (!this.visible) {
      return true;
    }
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid;
  }

}
