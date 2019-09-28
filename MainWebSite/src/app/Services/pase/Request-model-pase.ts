export class  RequestModelPaseAccount{
    ClientId: string;    
    RoleId:string;
    OperationId: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class RequestModelPaseDetail
{
    CodeService :string;
    DatesInitialProcess: string;
    DatesFinalProcess :string;
    InitialRegistration :Number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class RequestModelHeadPase
{
    CodeService :string;
    DatesInicial :string;
    DatesEnd:string;    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
