import { SelectedVoucher } from "./selected-voucher";

export class VoucherDto {
    id: number;
    operationTypeId: number;
    nameOperation: string;
    numberTypeVoucher: number;
    userCreationId: number;
    txtName: string;

    arrayVoucher: Array<SelectedVoucher>;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
