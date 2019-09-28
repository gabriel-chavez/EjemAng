import { EmployResult } from './employ-result';
import { AgencyResult } from './agency-result';

export class ParametersResult {
  employes: EmployResult[];
  agencies: AgencyResult[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
