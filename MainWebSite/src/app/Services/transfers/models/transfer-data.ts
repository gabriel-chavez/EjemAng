import { ProcessBatchDto } from '../../shared/models/process-batch';

export class TransferData extends ProcessBatchDto {
  isFavorite: boolean;
  favoriteName: string;
  beneficiary: string;
  destinationAccount: string;
  targetAccountCurrency: string;
  fundSource: string;
  fundDestination: string;
  sendVouchers: string;
  approvers: number[];
  controllers: number[];
  tokenCode: string;
  tokenName: string;
}
