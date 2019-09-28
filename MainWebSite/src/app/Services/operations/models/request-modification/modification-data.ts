import { CompanyInformation } from "./company-information";
import { User } from "./user";
import { ProcessBatchDto } from "../../../shared/models/process-batch";


export class ModificationData extends ProcessBatchDto{
  companyInformations: CompanyInformation = new CompanyInformation();
  users: User[];
  operation: number;
}
