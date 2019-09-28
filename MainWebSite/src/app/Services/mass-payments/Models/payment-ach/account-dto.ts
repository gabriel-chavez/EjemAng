export class AccountDto {
  formattedAccount: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
