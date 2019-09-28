export class DetailClaimRequest {
ProductName: string;
// AccountId: number;
AccountNumber: string;
ClaimType?: string;
// ServiceId: string;
ServiceName: string;
Amount?: number;
Currency?: string;
TransactionDate?: Date;
TransactionTime?: string;
Description: string;
// UserId: number;
// MessageProcess: string;
// State: string;
CardNumber: string;
Fax: string;
Phone: string;
CellPhone: string;
Email: string;
// NumberCaseSarc: string;
// BranchOffice: string;
// Agency: string;
// ReasonRejection: string;
Address: string;
Department: string;
// RouteSarc: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
