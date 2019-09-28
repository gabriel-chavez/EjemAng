import { ProcessBatchDto } from "../../shared/models/process-batch";
import { Payment } from "./payment";

export class RuatPayment extends ProcessBatchDto {
  fundSource: string;
  fundDestination: string;
  approvers: number[];
  controllers: number[];
  sendVouchers: string;
  service: string;
  tokenCode: string;
  tokenName: string;
  payment: Payment;
}
