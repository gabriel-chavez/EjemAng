import { TransferAbroadFrecuentDto } from './transfer-abroad-frecuent-dto';

export class TransferAbroadDetailDto extends TransferAbroadFrecuentDto {
    processBatchId: number;
    beneficiaryBusinessName: string;
    beneficiaryAddress: string;
    beneficiaryPhone: string;
    beneficiaryNumberAccount: string;
    beneficiaryPaymentConcept: string;
    beneficiaryDocumentNumber: string;
    beneficiaryDocumentType: string;
    beneficiaryCountryResidence: string;
    beneficiaryCityResidence: string;
    beneficiaryEmail: string;
    payerBankName: string;
    payerBankCodeSwift: string;
    payerBankAddress: string;
    payerBankCity: string;
    payerBankCountry: string;
    payerBankFullData: string;
    intermediaryBankName: string;
    intermediaryBankCodeSwift: string;
    intermediaryBankAddress: string;
    intermediaryBankCity: string;
    intermediaryBankCountry: string;
    intermediaryBankFullData: string;
    intermediaryBankNumberAccountPayer: string;
    requesterAddress: string;
    requesterPhone: string;
    requesterEmail: string;
    requesterNumberAccount: string;
    exchangeRate: number;
    transferCategoryCode: string = null;
    transferCategory: string;
    transferReason: string;
    detailCharges: string;
}
