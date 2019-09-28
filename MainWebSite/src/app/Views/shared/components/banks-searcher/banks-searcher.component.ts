import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DestinationBankResult } from '../../../../Services/transfers-abroad/models/destination-bank-result';
import { DestinationBanksDto } from '../../../../Services/transfers-abroad/models/destination-banks-dto';
import { TransfersAbroadService } from '../../../../Services/transfers-abroad/transfer-abroad.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-banks-searcher',
  templateUrl: './banks-searcher.component.html',
  styleUrls: ['./banks-searcher.component.css']
})
export class BanksSearcherComponent implements OnInit {
  searchType: string;
  searchText = '';
  searchTextSelected = '';
  isFirstTime = true;
  @Input() sourceAccount: string;
  @Output() onChange = new EventEmitter();
  @Input() disabled = false;
  destinationBanks: DestinationBankResult[] = [];
  filterBanks: DestinationBankResult[] = [];
  bankSelected: DestinationBankResult = null;
  @Input() bankSelectedDetail: DestinationBankResult = new DestinationBankResult();
  @ViewChild('formSearchBank') form: NgForm;
  @ViewChild('formDetailBank') formDetail: NgForm;

  constructor(private transfersAbroadService: TransfersAbroadService,
    private globalService: GlobalService) {
    this.searchType = 'swift';
  }

  ngOnInit() {
  }

  getBanks() {
    const destinationBankDto: DestinationBanksDto = new DestinationBanksDto();
    destinationBankDto.numberAccount = this.sourceAccount;

    this.transfersAbroadService.getDestinationBanks(destinationBankDto)
      .subscribe((response: DestinationBankResult[]) => {
        this.destinationBanks = response;
        this.filter();
      });
  }

  handleSearchBanks() {
    this.isFirstTime = false;
    if (this.destinationBanks.length === 0 && this.searchText.trim() !== '') {
      this.getBanks();
    } else {
      this.filter();
    }
  }

  filter() {
    this.searchTextSelected = this.searchText;
    if (this.searchType === 'name') {
      this.filterBanks = this.destinationBanks.filter(x => x.name.indexOf(this.searchText.trim().toUpperCase()) !== -1);
    } else {
      this.filterBanks = this.destinationBanks.filter(x => x.code.indexOf(this.searchText.trim().toUpperCase()) !== -1);
    }

    if (this.filterBanks.length > 0) {
      this.bankSelected = this.filterBanks[0];
      this.bankSelectedDetail = this.bankSelected;
    } else {
      this.bankSelected = null;
      this.bankSelectedDetail = new DestinationBankResult();
    }
    this.onChange.emit(this.bankSelectedDetail);
  }

  handleSelectBank() {
    this.bankSelectedDetail = this.bankSelected ? this.bankSelected : new DestinationBankResult();
    this.onChange.emit(this.bankSelectedDetail);
  }

  handleValidate() {
    if (this.bankSelectedDetail.code) {
      return true;
    }
    this.globalService.validateAllFormFields(this.form.form);
    this.globalService.validateAllFormFields(this.formDetail.form);
    return this.form.valid && this.formDetail.form.valid;
  }
}
