import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountResult } from '../../../../Services/accounts/models/account-result';
import { BalancesAndMovementsService } from '../../../../Services/balances-and-movements/balances-and-movements.service';
import { BalancesDto } from '../../../../Services/balances-and-movements/models/balances-dto';
import { BalancesResult } from '../../../../Services/balances-and-movements/models/balances-result';
import { DataService } from '../../../../Services/shared/data.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-balances-list',
  templateUrl: './balances-list.component.html',
  styleUrls: ['./balances-list.component.css'],
  providers: [BalancesAndMovementsService]
})
export class BalancesListComponent implements OnInit {

  accounts: AccountResult[] = [];
  totalBalances: BalancesResult[] = [];
  errorMessageGettingAccountInformation = 'No se pudo obtener informacion de esta cuenta';
  @Input() balancesDto: BalancesDto;

  constructor(private balancesAndMovementsService: BalancesAndMovementsService,
    private globalService: GlobalService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.balancesAndMovementsService.getBalances(this.balancesDto)
      .subscribe(response => {
        this.accounts = response.accounts;
        this.totalBalances = response.totalBalances;
      }, error => this.globalService.warning('Saldos y Movimientos', error.message));
  }

  handleShowDetails(accountId: number) {
    this.dataService.serviceData = accountId;
    this.router.navigate(['/queries/movements']);
  }
}
