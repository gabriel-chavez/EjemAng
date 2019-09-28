export class TrackTransfersResult {
    id: number;
    name: string; // { get; set; }
    operationTypeId: number;
    accountId: number;
    formattedAccount: string;
    amount: number;
  currency: string;
  dateCreation: Date;
    dateProcess: Date;
    description: string;
    isAuth: boolean;
    isCtrl: boolean;
    isScheduledProce: boolean;
    scheduledProcess: Date;
  beneficiary: string;
  isAuthorizerControl: boolean;
  isSignerScheme: boolean;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
