export class Usuario {
  EstadoEmpleadoActivo: boolean;
  SuperiorUsuarioAD: string;
  SuperiorUsuario: string;
  SuperiorCargo: string;
  SuperiorNombre: string;
  SuperiorSecuencial: number;
  SucursalDepartamento: string;
  SucursalCiudad: string;
  SucursalDireccion: string;
  SucursalNombre: string;
  SucursalCodigo: number;
  SucursalIdDepartamento: string;
  EmpleadoCiudadResidencia: string;
  EmpleadoDireccion: string;
  EmpleadoDocumentoCompleto: string;
  EmpleadoDocumentoExtension: string;
  EmpleadoDocuentoNro: string;
  EmpleadoDocumentoTipo: string;
  EmpleadoNombreCompleto: string;
  EmpleadoApCasada: string;
  EmpleadoApMaterno: string;
  EmpleadoApPaterno: string;
  EmpleadoNombreAlt: string;
  EmpleadoNombreSeg: string;
  EmpleadoNombrePrim: string;
  EmpleadoUsuarioAD: number;
  EmpleadoUsuario: string;
  EmpleadoCargo: string;
  EmpleadoSecuencial: number;
  ContratoSecuencial: number;
  Roles: Rol[];
}

export class Rol {
  RolId: number;
  RolDescripcion: string;
  RolSistemas: string;
}
