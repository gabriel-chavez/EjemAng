import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ChangesInformation } from '../../../Services/operations/models/request-modification/changes-information';
import { CompanyInformation } from '../../../Services/operations/models/request-modification/company-information';
import { ModificationData } from '../../../Services/operations/models/request-modification/modification-data';
import { OperationTypeResult } from '../../../Services/operations/models/request-modification/operation-type-result';
import { Role, User } from '../../../Services/operations/models/request-modification/user';
import { Account, UserRole } from '../../../Services/operations/models/request-modification/user-role';
import { ModificationRequestService } from '../../../Services/operations/modification-request.service';
import { ParameterDto } from '../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../Services/parameters/models/parameter-result';
import { ParametersService } from '../../../Services/parameters/parameters.service';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { GlobalService } from '../../../Services/shared/global.service';
import { Actions } from '../../../Services/operations/models/request-modification/actions';

@Component({
  selector: 'app-modification-request',
  templateUrl: './modification-request.component.html',
  styleUrls: ['./modification-request.component.css'],
  providers: [ModificationRequestService, ParametersService]
})
export class ModificationRequestComponent implements OnInit {

  disabled = false;
  isOperationSuccessful = false;
  isOperationSelected = false;
  isVisibleToken = false;
  addAccountHasBeenRequested = false;
  addUserHasBeenRequested = false;
  changeRolesHasBeenRequested = false;
  showRequestDetail = false;
  isModification = false;
  newUserId = -1;
  userId: number;
  processBatchId: number;
  newAccount: string;
  pageItems = 10;
  pageItemsForUsers = 5;
  actions = [{ description: 'NINGUNA', code: Actions.unchanged }, { description: 'ELIMINAR', code: Actions.deleted }, { description: 'MODIFICAR', code: Actions.changed }, { description: 'ADICIONAR', code: Actions.added }]
  users: User[] = [];
  usersPerPage: User[] = [];
  documentTypes: ParameterResult[];
  idcExtensions: ParameterResult[];
  countries: ParameterResult[];
  operationTypes: OperationTypeResult[];
  selectedOperation: OperationTypeResult = new OperationTypeResult();
  selectedUser: User = new User();
  approversDto: InputApprovers = new InputApprovers();
  rolesByOperation: UserRole = new UserRole();
  rolesByOperationPerPage: UserRole = new UserRole();
  userRolesPerCompany: UserRole[];
  originalUserRolesPerCompany: UserRole[];
  changesInformation: ChangesInformation[] = [];
  changesInformationPerPage: ChangesInformation[] = [];
  companyInformation: CompanyInformation = new CompanyInformation();
  modificationData: ModificationData = new ModificationData();
  isTokenFormDisabled = false;
  validateRol = true;
  validateRolMessage = '';
  @ViewChild('userForm') userForm: NgForm;
  @ViewChild('accountForm') accountForm: NgForm;

  constructor(private service: ModificationRequestService, private messageService: GlobalService, private parametersService: ParametersService) { }

  ngOnInit() {
    this.approversDto = {
      operationTypeId: OperationType.formularioModificacion
    };
    this.service.getOriginalData().subscribe(response => {
      this.users = response.users;
      this.users.map(x => x.action = Actions.unchanged);
      this.usersPerPage = this.users.slice(0, this.pageItemsForUsers);
      this.userRolesPerCompany = response.userRoles;
      this.userRolesPerCompany.map(x => x.account.map(y => y.role.map(z => z.isEditable = z.isSelected)));
      this.modificationData.companyInformations = response.companyInformations;
    }, error => this.messageService.warning('Solicitud de modificaciones', error.message));
    this.getDocumentTypes();
    this.getIdcExtensions();
    this.getCountryCodes();
    this.getOperationTypes();
    this.getRoles();
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.modificationData.approvers = $event.approvers;
    this.modificationData.controllers = $event.controllers;
  }

  handleShowUserDetail(userId: number) {
    this.addUserHasBeenRequested = true;
    this.selectedUser = Object.assign({}, this.users.find(x => x.id == userId));
  }

  handleShowRoles(userId: number) {
    this.changeRolesHasBeenRequested = true;
    this.userId = userId;
    this.handleSetRolesByOperation();
  }

  handleDeleteUser(userId: number) {
    this.users[this.users.findIndex(x => x.id === userId)].action = Actions.deleted;
    this.users[this.users.findIndex(x => x.id === userId)].status = 2;
  }

  handleIsThereDeletedUsers(): boolean {
    return this.users.find(x => x.action === Actions.deleted || x.action === Actions.changed ) !== undefined;
  }

  handleSaveUserInformation() {
    this.messageService.validateAllFormFields(this.userForm.form);
    if (!this.userForm.form.valid) {
      return;
    }
    if (!this.isModification) {
      this.selectedUser.action = Actions.added;
      this.selectedUser.status = 1;
      this.selectedUser.id = this.newUserId--;
      this.users.push(Object.assign({}, this.selectedUser));
      this.userRolesPerCompany = this.userRolesPerCompany.concat(this.getOperationsForNewUser());
      this.originalUserRolesPerCompany = this.originalUserRolesPerCompany.concat(this.getOperationsForNewUser());
      this.cleanNewUserForm();
    } else {
      if (this.selectedUser.newEmail || this.selectedUser.newLimit) {
        this.selectedUser.action = Actions.changed;
        this.users[this.users.findIndex(x => x.id === this.selectedUser.id)] = this.selectedUser;
      }
    }
    this.usersPerPage = this.users.slice(0, this.pageItemsForUsers);
    this.addUserHasBeenRequested = false;
  }

  handleSaveAccountInformation() {
    this.messageService.validateAllFormFields(this.accountForm.form);
    if (!this.accountForm.form.valid) {
      return;
    }
    this.userRolesPerCompany.map(x => x.account.push(new Account({
      formattedNumber: this.newAccount,
      role: [{ id: 2, isSelected: false, status: Actions.unchanged }, { id: 4, isSelected: false, status: Actions.unchanged }, { id: 3, isSelected: false, status: Actions.unchanged }, { id: 1, isSelected: false, status: Actions.unchanged }]
    })));
    this.originalUserRolesPerCompany.map(x => x.account.push(new Account({
      formattedNumber: this.newAccount,
      role: [{ id: 2, isSelected: false, status: Actions.unchanged }, { id: 4, isSelected: false, status: Actions.unchanged }, { id: 3, isSelected: false, status: Actions.unchanged }, { id: 1, isSelected: false, status: Actions.unchanged }]
    })));
    this.addAccountHasBeenRequested = false;
    this.newAccount = '';
  }

  handleSetRolesByOperation() {
    this.rolesByOperation = Object.assign({}, this.userRolesPerCompany.find(x => x.operationTypeId === this.selectedOperation.id && x.userId === this.userId));
    this.rolesByOperationPerPage.operationTypeId = this.rolesByOperation.operationTypeId;
    this.rolesByOperationPerPage.userId = this.rolesByOperation.userId;
    this.rolesByOperationPerPage.account = this.rolesByOperation.account.slice(0, this.pageItems);
  }

  handleChecked() {
    let index = this.userRolesPerCompany.findIndex(x => x.operationTypeId === this.selectedOperation.id && x.userId === this.userId);
    this.userRolesPerCompany[index] = this.rolesByOperation;
    setTimeout(() => this.updateChangesInformation(), 100);
    setTimeout(() => this.updateUserAction(index), 100);
  }

  handleUsersPageChanged($event) {
    this.usersPerPage = this.users.slice((($event - 1) * this.pageItemsForUsers), this.pageItemsForUsers * $event);
  }

  handleChangesInformationPageChanged($event) {
    this.changesInformationPerPage = this.changesInformation.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  handleRolesPageChanged($event) {
    this.rolesByOperationPerPage.account = this.rolesByOperation.account.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  handleValidate(approversAndControllersValidation: boolean) {
    if (approversAndControllersValidation) {
      this.modificationData.currency = '-';
      this.modificationData.sourceAccount = '-';
      // this.modificationData.companyInformations.newLimit = + this.modificationData.companyInformations.newLimit;
      this.modificationData.operation = this.isModification ? 0 : 1;
      this.modificationData.users = this.users.filter(x => (x.action !== Actions.unchanged && this.changesInformation.find(y => y.userId === x.id)) || x.action === Actions.deleted || x.action === Actions.changed);
      for (var i = 0; i < this.modificationData.users.length; i++) {
        this.modificationData.users[i].roles = [];
        let userChanges = this.changesInformation.filter(x => x.userId == this.modificationData.users[i].id);
        for (var j = 0; j < userChanges.length; j++) {
          let roles = userChanges[j].roles.filter(x => x.status == Actions.changed);
          for (var k = 0; k < roles.length; k++) {
            this.modificationData.users[i].roles.push(new Role({ operationTypeId: userChanges[j].operationTypeId, formattedAccount: userChanges[j].account, roleId: roles[k].id }));
          }
        }
      }
      this.isVisibleToken = true;
    }
  }

  handleTokenSubmit($event) {
    this.modificationData.tokenCode = $event.code;
    this.modificationData.tokenName = $event.name;
    this.service.saveChanges(this.modificationData).subscribe(response => {
      this.processBatchId = response.processBatchId;
      this.isOperationSuccessful = this.disabled = true;
      this.isVisibleToken = false;
      this.messageService.info('Operación realizada', `Su operación ha sido enviada satisfactoriamente a "Solicitudes Pendientes de Autorización" desde donde el o los usuario(s) que cuenten con los permisos podrán autorizar el lote Nro. ${this.processBatchId} más adelante. Una vez aprobada su operación, será enviada a Back Office para su ejecución.Verificar en la pantalla de Seguimiento hasta comprobar que se procesó corréctamente.`, true);
    }, error => this.messageService.warning('Solicitud de modificaciones', error.message));
  }

  private updateUserAction(index: number) {
    for (var i = 0; i < this.userRolesPerCompany[index].account.length; i++) {
      if (this.userRolesPerCompany[index].account[i].role.find(z => z.status == Actions.changed) !== undefined) {
        this.users[this.users.findIndex(x => x.id == this.userId)].action = Actions.changed;
        break;
      } else {
        this.users[this.users.findIndex(x => x.id == this.userId)].action = Actions.unchanged;
      }
    }
  }

  private updateChangesInformation() {
    this.changesInformation = [];
    for (var i = 0; i < this.userRolesPerCompany.length; i++) {
      for (var j = 0; j < this.userRolesPerCompany[i].account.length; j++) {
        for (var k = 0; k < this.userRolesPerCompany[i].account[j].role.length; k++) {
          this.userRolesPerCompany[i].account[j].role[k].status =
            this.originalUserRolesPerCompany[i].account[j].role[k].isSelected !== this.userRolesPerCompany[i].account[j].role[k].isSelected ? Actions.changed : Actions.unchanged;
        }
        if (this.userRolesPerCompany[i].account[j].role.find(x => x.status === Actions.changed)) {
          this.changesInformation.push(new ChangesInformation({
            user: this.users.find(x => x.id === this.userRolesPerCompany[i].userId).fullName,
            userId: this.users.find(x => x.id === this.userRolesPerCompany[i].userId).id,
            operationType: this.operationTypes.find(x => x.id === this.userRolesPerCompany[i].operationTypeId).name,
            operationTypeId: this.operationTypes.find(x => x.id === this.userRolesPerCompany[i].operationTypeId).id,
            account: this.userRolesPerCompany[i].account[j].formattedNumber,
            roles: this.userRolesPerCompany[i].account[j].role
          }));
        }
      }
    }
    this.changesInformationPerPage = this.changesInformation.slice(0, this.pageItems);
  }

  private getOperationsForNewUser(): UserRole[] {
    let operations: UserRole[] = [];
    for (var operation of this.operationTypes) {
      operations.push(new UserRole({ operationTypeId: operation.id, userId: this.selectedUser.id, account: this.getAccountsForNewUser() }));
    }
    return operations;
  }

  private getAccountsForNewUser(): Account[] {
    let accounts: Account[] = [];
    for (var account of this.userRolesPerCompany[0].account) {
      accounts.push(new Account({
        id: account.id,
        formattedNumber: account.formattedNumber,
        accountUse: account.accountUse,
        role: [{ id: 2, isSelected: false, status: Actions.unchanged }, { id: 4, isSelected: false, status: Actions.unchanged }, { id: 3, isSelected: false, status: Actions.unchanged }, { id: 1, isSelected: false, status: Actions.unchanged }]
      }))
    }
    return accounts;
  }

  private getDocumentTypes() {
    this.parametersService.getByGroup(new ParameterDto({ group: 'TIPDOC' })).subscribe(response => {
        this.documentTypes = response;
        this.selectedUser.idcType = response[0].code;
      }, error => this.messageService.danger('Parámetros', error.message));
  }

  private getIdcExtensions() {
    if (!this.idcExtensions) {
      this.parametersService.getByGroup(new ParameterDto({ group: 'LUGEXT' })).subscribe(response => {
          this.idcExtensions = response;
          this.selectedUser.idcExtension = response[0].code;
        }, error => this.messageService.danger('Parámetros', error.message));
    } else {
      this.selectedUser.idcExtension = this.idcExtensions[0].code;
    }
  }

  private getCountryCodes() {
    if (!this.countries) {
      this.parametersService.getByGroup(new ParameterDto({ group: 'CODPAS' })).subscribe(response => {
          this.countries = response;
          this.selectedUser.idcExtension = response[0].code;
        }, error => this.messageService.danger('Parámetros', error.message));
    } else {
      this.selectedUser.idcExtension = this.countries[0].code;
    }
  }

  private getOperationTypes() {
    this.service.getOperationTypes().subscribe(response => {
      this.operationTypes = response;
      this.selectedOperation = this.operationTypes[0];
    }, error => this.messageService.danger('Parámetros', error.message));
  }

  private cleanNewUserForm() {
    this.selectedUser = new User();
    this.selectedUser.idcType = this.documentTypes[0].code;
  }

  private getRoles() {
    this.service.getOriginalData().subscribe(response => {
        this.originalUserRolesPerCompany = response.userRoles;
      }, error => {
         this.messageService.danger('Solicitud de modificaciones',
        error.message);
        this.validateRol = false;
        this.validateRolMessage = error.message;
      });
  }
}
