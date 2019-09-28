export class MovAccountsDto {
  NumberCta: string;
  DateIni: string;
  DateEnd: string;
  RowIni: number;
  NumberRow: number;
  ReportType: string;
  OutListType: Boolean;
  FormattedAccount: string;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
