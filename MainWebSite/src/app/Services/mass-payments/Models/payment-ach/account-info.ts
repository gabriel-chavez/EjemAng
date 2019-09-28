export class AccountInfo {
    accountType: string;
    nameClient: string;
    documentType: string;
    documentNumber: string;
    branchOffice: string;
     constructor(values: Object = {}) {
       Object.assign(this, values);
     }
}
