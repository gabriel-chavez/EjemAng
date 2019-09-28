export class ClaimRequestResult {
    Departament: string;
    Address: string;
    Phone: string;
    CellPhone: string;
    Fax: string;
    Email: string;
    ProductName: string;
    AccountNumber: string;
    CardNumber: string;
    ServiceName: string;
    TransactionDate?: Date;
    TransactionTime?: string;
    Amount?: number;
    Currency?: string;
    Description: string;
    // UserId: number;
    // MessageProcess: string;
    // State: string;
    // AccountId: number;
    ClaimType?: string;
    // ServiceId: string;
    // NumberCaseSarc: string;
    // BranchOffice: string;
    // Agency: string;
    // ReasonRejection: string;
    // RouteSarc: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
