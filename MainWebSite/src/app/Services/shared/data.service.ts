import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  serviceData: any;
  noAccounts: boolean = false;
  noAccountsMessage = '';
}
