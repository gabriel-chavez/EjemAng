export class TransferDetail {
  sourceAccount: string;
  destinationAccount: string;
  beneficiary: string;
  amount: number;
  currency: string;
  ticketNumber: number;
  preferentialExchange: number;
  isScheduledProcess: boolean;
  scheduledProcessDate : Date;
  user: string;
  batchStatus: string;
  fundSource: string;
  fundDestination: string;
}
