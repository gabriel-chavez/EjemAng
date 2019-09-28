export class AccountResult {
  id: number;
  number: string;
  type: string;
  application: string;
  applicationDescription: string;
  currency: string;
  currencyDescription: string;
  formattedNumber: string;
  owner: string;
  inProgressOperation: number;
  withholding: number;
  averageBalance: number;
  availableBalance: number;
  accountingBalance: number;
  position: number;
  overdraftAmount?: number;
  overdraftBalance?: number;
  isAuthorizerControl: boolean;
  balanceErrorMessage: string;
}
