export class MultiplePaymentsUpdateResult {
    totalAmount;
    multiplePayments: MultiplePaymentUpdateResult[];
}

export class MultiplePaymentUpdateResult {
    multiplePaymentId: number;
    newAmount: number;
    previusAmount: number;
    message: string;
}
