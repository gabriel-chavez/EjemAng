export class MonthsResult {
  initial: Date;
  final: Date;
  description: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
