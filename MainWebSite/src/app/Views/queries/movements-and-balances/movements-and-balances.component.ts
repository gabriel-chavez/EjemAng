import { Component, OnInit } from '@angular/core';
import { BalancesDto } from '../../../Services/balances-and-movements/models/balances-dto';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { Roles } from '../../../Services/shared/enums/roles';

@Component({
  selector: 'app-movements-and-balances',
  templateUrl: './movements-and-balances.component.html',
  styleUrls: ['./movements-and-balances.component.css']
})
export class MovementsAndBalancesComponent implements OnInit {

  balancesDto: BalancesDto;

  constructor() { }

  ngOnInit() {
    this.balancesDto = {
      operationTypeId: [OperationType.consultarCuentas],
      roleId: Roles.consultant,
      accountUse: String.fromCharCode(AccountUse.debit),
      types: [String.fromCharCode(AccountTypes.passive)]
    };
  }

}
