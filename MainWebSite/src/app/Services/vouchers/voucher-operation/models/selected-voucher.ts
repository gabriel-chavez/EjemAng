export class SelectedVoucher {
    id: number;
    operationTypeId: number;
    nameOperation: string;
    typeVoucher: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
