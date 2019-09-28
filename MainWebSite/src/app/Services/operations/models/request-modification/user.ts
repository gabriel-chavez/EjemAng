export class User {
  id: number;
  fullName: string;
  documentNumber: string;      
  idcType: string;
  idcComplement: string;
  idcExtension: string;
  email: string;
  limit: number;
  newEmail: string;
  newLimit: string;
  action: number;
  status: number;
  roles: Role[];
}

export class Role {
  operationTypeId: number;
  formattedNumber: string;
  roleId: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
