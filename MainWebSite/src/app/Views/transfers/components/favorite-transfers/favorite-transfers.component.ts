import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FavoriteTransferResponse } from '../../../../Services/transfers/models/favorite-transfer-response';
import { FavoriteTransferRequest } from '../../../../Services/transfers/models/favorite-transfer-request';
import { FavoriteTransferIdRequest } from '../../../../Services/transfers/models/favorite-transfer-id-request';
import { TransfersService } from '../../../../Services/transfers/transfers.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-favorite-transfers',
  templateUrl: './favorite-transfers.component.html',
  styleUrls: ['./favorite-transfers.component.css'],
  providers: [TransfersService]
})
export class FavoriteTransfersComponent implements OnInit {

  isCheckedFavoriteTransfer = false;
  favoriteTransfers: FavoriteTransferResponse[] = [];
  selectedTransfer: FavoriteTransferResponse;
  isUpdateModalVisible = false;
  isRemoveModalVisible = false;
  request: FavoriteTransferRequest = new FavoriteTransferRequest();
  removeRequest: FavoriteTransferIdRequest = new FavoriteTransferIdRequest();
  @Input() currency: string;
  @Input() amount: number;
  @Input() sourceAccountId: number;
  @Input() destinationAccountNumber: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Output() onChange = new EventEmitter();

  constructor(private transferService: TransfersService,
    private globalService: GlobalService) {
    this.disabled = false;
  }

  ngOnInit() {
    this.selectedTransfer = null;
    this.transferService.getFavorites().subscribe(
      response => this.favoriteTransfers = response, error => this.globalService.warning('Favoritos', error));
  }

  handleChangedFavoriteTransfer() {
    this.request.id = this.selectedTransfer.id;
    this.removeRequest.id = this.selectedTransfer.id;
    this.onChange.emit(this.selectedTransfer);
  }

  handleChangeChecked($event) {
    if (!$event) {
      this.selectedTransfer = null;
    }
  }

  handleUpdateFavoriteTransfer() {
    this.request.currency = this.currency;
    this.request.amount = this.amount;
    this.request.sourceAccountId = this.sourceAccountId;
    this.request.destinationAccountNumber = this.destinationAccountNumber;
    this.request.name = this.name;
    this.transferService.updateFavorite(this.request)
      .subscribe(response => {
        this.ngOnInit();
        this.isUpdateModalVisible = false;
      }, error => this.globalService.warning('Favoritos', error));
  }

  handleRemoveFavoriteTransfer() {
    this.transferService.removeFavorite(this.removeRequest)
      .subscribe(response => {
        this.ngOnInit();
        this.isRemoveModalVisible = false;
      }, error => this.globalService.warning('Favoritos', error));
  }
}
