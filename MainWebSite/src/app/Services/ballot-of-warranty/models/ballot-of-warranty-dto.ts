import { BallotOfWarrantyAmortizationDto } from './ballot-of-warranty-amortization-dto';
import { BallotOfWarrantyBusinessOfficerDto } from './ballot-of-warranty-business-officer-dto';
import { BallotOfWarrantyPublicWritingDetailDto } from './ballot-of-warranty-public-writing-detail-dto';
import { BallotOfWarrantyContractRoeDto } from './ballot-of-warranty-contract-reo-dto';
import { ProcessBatchDto } from '../../shared/models/process-batch';

export class BallotOfWarrantyDto extends ProcessBatchDto {
  personType: string;
  address: string;
  typeBallotOfWarranty: string;
  annualIncome: number;
  heritage: number;
  numberOfEmployees: number;
  civilState: string;
  literalAmount: string;
  termInDays: number;
  startDate: Date;
  expirationDate: Date;
  modality: string;
  beneficiary: string;
  object: string;
  objectSpecification: string;
  objectDescription: string;
  accountDebitId: number;
  statusRenovation: boolean;
  numberRenovation: string;
  typeWarranty: string;
  amountWarranty: number;
  originator: string;
  accountNumberId: number;
  bank: string;
  numberDPF: string;
  firstTitular: string;
  firstDocumentCI: string;
  secondTitular: string;
  secondDocumentCI: string;
  thirdTitular: string;
  thirdDocumentCI: string;
  entityName: string;
  entityDocumentCI: string;
  additionalClause: string;
  ipRequest: string;
  reasonForRejection: string;
  dateRejection: Date;
  userRejection: string;
  token: string;
  numberTarget: string;
  numberBallot: string;
  cupRate: number;
  numberWarranty: string;
  placeOfIssue: string;
  placeOfDelivery: string;
  comissionType: string;
  preferentialComissionType: string;
  nameThirdPerson: string;
  documentCIThirdPerson: string;
  agency: string;
  publicWritingDetails: BallotOfWarrantyPublicWritingDetailDto[] = [];
  amortizations: BallotOfWarrantyAmortizationDto[] = [];
  businessOfficers: BallotOfWarrantyBusinessOfficerDto[] = [];
  contractRoe: BallotOfWarrantyContractRoeDto;

  constructor() {
    super();
    this.annualIncome = null;
    this.amount = null;
    this.numberOfEmployees = null;
  }

}
