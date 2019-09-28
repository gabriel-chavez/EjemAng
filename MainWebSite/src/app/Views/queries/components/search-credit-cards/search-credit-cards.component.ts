import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreditCardsService } from '../../../../Services/credit-cards/credit-cards.service';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { CreditCardsAccountResult } from '../../../../Services/credit-cards/models/credit-cards-account-result';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-credit-cards',
  templateUrl: './search-credit-cards.component.html',
  styleUrls: ['./search-credit-cards.component.css'],
  providers: [CreditCardsService]
})
export class SearchCreditCardsComponent implements OnInit {
  @Input() request: AccountDto;
  @Output() onEvent = new EventEmitter();
  Response: CreditCardsAccountResult[];
  isVisible: boolean;
  totalItems = 10;
  currentPage = 0;

  constructor(private creditCardsService: CreditCardsService,
    private messageService: GlobalService, private router: Router) {
    this.isVisible = false;
  }

  ngOnInit() {
    this.creditCardsService
      .getAccountsCreditCards(this.request)
      .subscribe((resp: CreditCardsAccountResult[]) => {
        this.Response = resp;
        this.isVisible = true;
      }, (error) => this.messageService.warning('No se encontraron cuentas: ', error));
  }

  handleChangePage($event) {
    this.currentPage = $event;
  }

  handleShowDetails(accountId: number) {
    this.router.navigate(['/queries/creditCardsMovements'], { queryParams: { accountId: accountId }, skipLocationChange: true });
  }
}
