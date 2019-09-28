import { Component, OnInit } from '@angular/core';
import { BalancesAndMovementsService } from '../../../../Services/balances-and-movements/balances-and-movements.service';
import { AccountModel, MovementsModel } from '../../../../Services/balances-and-movements/models/movements-result';
import { DataService } from '../../../../Services/shared/data.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { AccountIdDto } from '../../../../Services/balances-and-movements/models/account-id-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css'],
  providers: [BalancesAndMovementsService]
})
export class MovementsListComponent implements OnInit {

  account: AccountModel = new AccountModel();
  movements: MovementsModel[] = [];

  constructor(private balancesAndMovementsService: BalancesAndMovementsService, private globalService: GlobalService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if (this.dataService.serviceData) {
      this.balancesAndMovementsService.getMovements(new AccountIdDto({ accountId: this.dataService.serviceData }))
        .subscribe(response => {
          this.account = response.account;
          this.movements = response.movements;
        }, error => this.globalService.warning('Saldos y movimientos', error.message));
    } else {
      this.router.navigate(['queries/balances']);
    }
  }
}
