import { FavoritePaymentsSpreadsheetsResult } from './favorite-payments-spreadsheets-result';
export class FavoritePaymentDetail {
    totalamount = 0;
    detail: FavoritePaymentsSpreadsheetsResult[] = [];
    typeOfLoad?: string;
    isNew?: boolean;
}

