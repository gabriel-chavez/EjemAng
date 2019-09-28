export class Constants {

  public static currencyBol = 'BOL';
  public static currencyUsd = 'USD';
  public static DOCUMENT_CI = 'Q';
  public static DOCUMENT_FISCALID = 'W';
  public static DOCUMENT_NIT = 'T';
  public static DOCUMENT_PASSPORT = 'P';
  public static DOCUMENT_RUN = 'U';
  public static DEFAULT_EXTENSION = '000';
  public static EMPTY_STRING = '';
  public static SALARIES_PAYMENT = 'HAB';
  public static PROVIDERS_PAYMENT = 'PROV';
  public static CASH_PAYMENT = 'EFE';
  public static ACH_PAYMENT = 'ACH';
  public static TYPEOFLOAD_MANUAL = 'MAN';
  public static TYPEOFLOAD_AUTOMATIC = 'ANT';
  public static TYPEOFLOAD_FILECHARGE = 'TXT';
  public static CIVIL_STATE = 'ESTCIV';
  public static OBJECT_BALLOT_OF_WARRANTY = 'BG_BOL';
  public static TYPE_WARRANTY = 'TIPGAR';


  public static serviceRUAT = 'ruat';
  public static serviceAFP = 'afp';

  public static ruatVehicles = 'V';
  public static ruatProperties = 'I';


  public static currencies = [
    { name: 'BOLIVIANOS', value: Constants.currencyBol },
    { name: 'DOLARES', value: Constants.currencyUsd },
  ];

  public static basicServices = [
    { name: 'CRE', value: 1 },
    { name: 'DELAPAZ', value: 2 },
    { name: 'SAGUAPAC', value: 11 },
    { name: 'TELEFONÍA FIJA', value: 3 },
    { name: 'TELEFONÍA MÓVIL', value: 4 },
  ];

  public static ruatServices = [
    { name: 'PAGO RUAT VEHÍCULOS', value: Constants.ruatVehicles },
    { name: 'PAGO RUAT INMUEBLES', value: Constants.ruatProperties }
  ];

  public static ruatDocumentExtensions = [
    { name: 'LP', value: '2', },
    { name: 'SC', value: '7' },
    { name: 'CO', value: '3' },
    { name: 'CH', value: '1' },
    { name: 'OR', value: '4' },
    { name: 'PO', value: '5' },
    { name: 'TA', value: '6' },
    { name: 'BE', value: '8' },
    { name: 'PA', value: '9' }
  ];

  public static rejectionOperation = 3;

  public static successfulTransferMessage = "Su operación ha sido enviada satisfactoriamente a 'Transferencias Pendientes de Confirmación' desde donde el(los) usuario(s) que cuente(n) con los permisos, podrán confirmar la transacción.Una vez aprobada su operación, es muy importante que pueda verificar en la pantalla de 'Seguimiento' hasta comprobar que su operación se procesó correctamente N° Lote";
  public creService = 'PAGO DE SERVICIOS CRE';
  public afpService = 'PAGO DE SERVICIOS APORTES A AFP';
  public saguapacService = 'PAGO DE SERVICIOS SAGUAPAC';
  public delapazService = 'PAGO DE SERVICIOS ENERGÍA ELÉCTRICA DELAPAZ';
  public fixedTelephonyService = 'PAGO DE SERVICIOS TELEFONÍA FIJA';
  public mobileTelephonyService = 'PAGO DE SERVICIOS TELEFONÍA MÓVIL';
  public vehicleRuatService = 'PAGO DE SERVICIOS IMPUESTOS DE VEHÍCULOS';
  public propertyRuatService = 'PAGO DE SERVICIOS IMPUESTOS DE INMUEBLES';

  documentTypes: Array<any> = [
    { name: 'C.I.', value: 'Q' },
    { name: 'I.D. FISCAL', value: 'W' },
    { name: 'NIT', value: 'T' },
    { name: 'PASAPORTE', value: 'P' },
    { name: 'RUN', value: 'U' },
  ];

  documentTypesCash: Array<any> = [
    { name: 'C.I.', value: 'Q' },
    { name: 'PASAPORTE', value: 'P' },
    { name: 'RUN', value: 'U' }
  ];

  documentTypesProviders: Array<any> = [
    { name: 'C.I.', value: 'Q' },
    { name: 'I.D. FISCAL', value: 'W' },
    { name: 'NIT', value: 'T' },
    { name: 'PASAPORTE', value: 'P' },
    { name: 'RUN', value: 'U' },
    { name: 'COD GEN BANCO', value: 'Y' },
    { name: 'OTRO', value: 'O' },
  ];
  public branchOffices = [
    { name: 'CHUQUISACA', value: '101' },
    { name: 'LA PAZ', value: '201' },
    { name: 'COCHABAMBA', value: '301' },
    { name: 'ORURO', value: '401' },
    { name: 'POTOSÍ', value: '501' },
    { name: 'TARIJA', value: '601' },
    { name: 'SANTA CRUZ', value: '701' },
    { name: 'BENI', value: '801' },
  ];

  public branchOfficesBallotOfWarranty = [
    { name: 'CHUQUISACA', value: '101' },
    { name: 'LA PAZ', value: '201' },
    { name: 'COCHABAMBA', value: '301' },
    { name: 'TARIJA', value: '601' },
    { name: 'SANTA CRUZ', value: '701' },
  ];

  public cities: string[] = ['LA PAZ', 'COCHABAMBA', 'SANTA CRUZ', 'ORURO',
    'CHUQUISACA', 'POTOSÍ', 'BENI', 'PANDO', 'TARIJA'];

  public streetTypes: string[] = ['Avenida', 'Calle'];

  public documentExtensions: Array<any> = [
    { name: 'LA PAZ', value: 'LP' },
    { name: 'COCHABAMBA', value: 'CB' },
    { name: 'SANTA CRUZ', value: 'SC' },
    { name: 'ORURO', value: 'OR' },
    { name: 'CHUQUISACA', value: 'CH' },
    { name: 'POTOSI', value: 'PO' },
    { name: 'BENI', value: 'BE' },
    { name: 'PANDO', value: 'PA' },
    { name: 'TARIJA', value: 'TJ' },
    { name: 'PERSONA EXTRANJERA', value: 'PE' },
  ];

  TYPE_NATURAL_PERSON = 'PN';
  TYPE_LEGAL_PERSON = 'PJ';
  DEPOSIT_PLACE = 'DPF';
  FUND_PLEDGE = 'PDF';
  CREDIT_LINE = 'LRC';

}
