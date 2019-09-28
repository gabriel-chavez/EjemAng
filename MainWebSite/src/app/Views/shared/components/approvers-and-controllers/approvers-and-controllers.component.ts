import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ApproverOrControllerResult } from '../../../../Services/approvers-and-controllers/models/approver-or-controller-result';
import { ApproversAndControllersService } from '../../../../Services/approvers-and-controllers/approversandcontrollers.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UserService } from '../../../../Services/users/user.service';
import { ApproversAndControllers } from '../../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { ApproversNumberResult } from '../../../../Services/approvers-and-controllers/models/approvers-number-result';
import { ControllerNumberResult } from '../../../../Services/approvers-and-controllers/models/controllers-number-result';
import { UtilsService } from '../../../../Services/shared/utils.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { CurrentUser } from '../../../../Services/users/models/current-user';
import { CismartAuthorizerResult } from '../../../../Services/approvers-and-controllers/models/cismart-authorizer-result';
import { CismartAuthorizerDto } from '../../../../Services/approvers-and-controllers/models/cismart-authorize-dto';
import { Authorizer } from '../../../../Services/approvers-and-controllers/models/authorizer';
import { InputApprovers } from '../../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversDto } from '../../../../Services/approvers-and-controllers/models/approvers-dto';
import { CismartApproversValidationDto } from '../../../../Services/approvers-and-controllers/models/cismart-approvers-validation-dto';
import { Observable, Subject } from 'rxjs';
import { CismartApproversValidationResult } from '../../../../Services/approvers-and-controllers/models/cismart-approvers-validation-result';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-approvers-and-controllers',
  templateUrl: './approvers-and-controllers.component.html',
  styleUrls: ['./approvers-and-controllers.component.css'],
  providers: [ApproversAndControllersService, UtilsService]
})
export class ApproversAndControllersComponent implements OnInit, OnChanges {

  data: ApproversAndControllers;
  approvers: ApproverOrControllerResult[] = [];
  cismartApprovers: CismartAuthorizerResult = new CismartAuthorizerResult();
  controllers: ApproverOrControllerResult[] = [];
  rejectedApprover: string;
  approversNumber: number;
  controllersNumber: number;
  controllersHaveErrors: boolean;
  approversHaveErrors: boolean;
  approversCismartHaveErrors: boolean;
  isSignature = false;
  @Input() showOnly = '';
  @Input() approversRequest: InputApprovers =new InputApprovers();
  @Input() isAdministrative: boolean;
  @Input() currency: string;
  @Input() amounts: number[] = [];
  @Input() amount: number;
  @Input() disabled: boolean;
  @Input() isVisible: boolean;
  @Input() showApproversNumber = false;
  @Output() onChange: EventEmitter<ApproversAndControllers>;

  constructor(private userService: UserService,
    private messageService: GlobalService,
    private utilsService: UtilsService,
    private approversAndControllersService: ApproversAndControllersService) {
    this.approversNumber = 0;
    this.controllersNumber = 0;
    this.isAdministrative = false;
    this.disabled = false;
    this.data = new ApproversAndControllers();
    this.onChange = new EventEmitter();
    this.isVisible = true;
    this.isSignature = userService.getUserToken().is_signature;   
  }

  ngOnInit() {
    if (this.isAdministrative) {
      this.getApproversAndControllersAdm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.approversRequest && !changes.approversRequest.isFirstChange() && !this.isAdministrative) {
      this.approvers = [];
      this.controllers = [];
      this.cismartApprovers = new CismartAuthorizerResult();
      this.getApproversAndControllers();
      this.onChange.emit(this.data);
    }
    if (changes.amount && !changes.amount.isFirstChange()) {
      this.amounts = [];
    }
  }

  getApproversAndControllers() {
    if (this.approversRequest.accountId !== undefined) {
      if (this.approversRequest.isSignerScheme || (this.isSignature && !this.isAdministrative)) {
        this.getCismartApprovers();
      } else {
        this.getApprovers();
      }
      if (this.userService.getUserToken().controller_scheme) {
        this.getControllers();
      }
    }
  }

  getApproversAndControllersAdm() {
    this.getAdmApprovers();
    if (this.userService.getUserToken().controller_scheme) {
      this.getAdmControllers();
    }
  }

  getApprovers() {
    this.data.approvers = [];
    this.approversAndControllersService
      .getApprovers(this.getApproversDto())
      .subscribe((response: ApproverOrControllerResult[]) => {
        this.approvers = response;
        this.getApproversNumber();
      }, error => this.messageService.warning('Autorizadores', error));
  }

  getCismartApprovers() {
    this.data.cismartApprovers = [];
    const dto: CismartAuthorizerDto = {
      accountNumber: this.approversRequest.accountNumber,
      operationTypeId: this.approversRequest.operationTypeId,
      batchId: this.approversRequest.batchId,
      accountId: this.approversRequest.accountId
    };

    this.approversAndControllersService
      .getCismartApprovers(dto)
      .subscribe((response: CismartAuthorizerResult) => {
        this.cismartApprovers = response;
        this.approversNumber = response.authorizers.length;
      }, error => this.messageService.warning('Autorizadores', error));
  }

  getAdmApprovers() {
    this.data.approvers = [];
    this.approversAndControllersService
      .getAdmApprovers(this.getApproversDto())
      .subscribe((response: ApproverOrControllerResult[]) => {
        this.approvers = response;
        this.getApproversNumber();
      }, error => this.messageService.warning('Autorizadores', error));
  }

  getControllers() {
    this.data.controllers = [];
    this.approversAndControllersService
      .getControllers(this.getApproversDto())
      .subscribe((response: ApproverOrControllerResult[]) => {
        this.controllers = response;
        this.getControllersNumber();
      }, error => this.messageService.warning('Controladores', error));
  }

  getAdmControllers() {
    this.data.controllers = [];
    this.approversAndControllersService
      .getAdmControllers(this.getApproversDto())
      .subscribe((response: ApproverOrControllerResult[]) => {
        this.controllers = response;
        this.getControllersNumber();
      }, error => this.messageService.warning('Controladores', error));
  }

  getApproversNumber() {
    if (!this.approversRequest.isAuthorizerControl) {
      this.approversRequest.accountId = undefined;
    }
    this.approversAndControllersService
      .getApproversNumber(this.getApproversDto())
      .subscribe((response: ApproversNumberResult) => {
        this.approversNumber = response.approversNumber;
      }, error => this.messageService.warning('Autorizadores', error));
  }

  getControllersNumber() {
    const numberControllerDto = this.getApproversDto();
    if (!this.approversRequest.isAuthorizerControl) {
      numberControllerDto.accountId = undefined;
    }
    this.approversAndControllersService
      .getControllersNumber(numberControllerDto)
      .subscribe((response: ControllerNumberResult) => {
        this.controllersNumber = response.controllersNumber;
      }, error => this.messageService.warning('Controladores', error));
  }

  handleApproverChecked(id: number) {
    this.data.approvers = this.addOrRemoveElements(this.data.approvers, id);
    this.validateApproversNumber();
    this.onChange.emit(this.data);
  }

  handleApproverCismartChecked(authorizer: Authorizer) {
    const { data } = this;
    let exists = false;
    for (let index = 0; index < data.cismartApprovers.length; index++) {
      if (data.cismartApprovers[index].id === authorizer.id) {
        data.cismartApprovers.splice(index, 1);
        exists = true;
        break;
      }
    }
    if (!exists) {
      this.data.cismartApprovers.push({ idc: authorizer.idc, id: authorizer.id, type: authorizer.typeId });
    }
    this.onChange.emit(this.data);
  }

  handleControllerChecked(id: number) {
    this.data.controllers = this.addOrRemoveElements(this.data.controllers, id);
    this.validateControllersNumber();
    this.onChange.emit(this.data);
  }

  addOrRemoveElements(array: number[], item: number): number[] {
    array.includes(item) ? array.splice(array.indexOf(item, 0), 1) : array.push(item);
    return array;
  }

  validateApproversLimit(): boolean {
    if (this.isSignature && !this.isAdministrative) {
      return true;
    }
    const currentUser: CurrentUser = this.userService.getUserToken();
    if (this.amounts.length === 0 && this.amount) {
      this.amounts.push(this.amount);
    }
    if (currentUser.authorize_operation) {
      for (const amount of this.amounts) {
        const checkAmount = this.currency === Constants.currencyBol ? this.utilsService.changeAmountBolToUsd(amount) : amount;
        for (const approverId of this.data.approvers) {
          const approver = this.approvers.find(item => item.id === approverId);
          if (!this.validateLimit(approver, checkAmount)) {
            return false;
          }
        }
      }
    } else {
      const sum = this.amounts.reduce((a, b) => (+a) + (+b), 0);
      const amount = this.currency === Constants.currencyBol ? this.utilsService.changeAmountBolToUsd(sum) : sum;
      for (const approverId of this.data.approvers) {
        const approver = this.approvers.find(item => item.id === approverId);
        if (!this.validateLimit(approver, amount)) {
          return false;
        }
      }
    }
    return true;
  }

  validateLimit(approver: ApproverOrControllerResult, amount: number) {
    if (approver.limit < amount) {
      this.rejectedApprover = approver.names + ' ' + approver.firstLastName + ' ' + approver.secondLastName;
      this.messageService.danger('Límite superado', 'El monto a abonar no puede ser mayor al límite del autorizador: ' + this.rejectedApprover);
      return false;
    }
    return true;
  }

  validateApproversNumber() {
    if (this.isSignature && !this.isAdministrative) {
      this.approversCismartHaveErrors = this.data.cismartApprovers.length === 0;
    } else {
      this.approversHaveErrors = this.data.approvers.length < this.approversNumber;
    }
  }

  validateControllersNumber() {
    this.controllersHaveErrors = this.data.controllers.length < this.controllersNumber;
  }

  handleValidate(): boolean {
    this.validateApproversNumber();
    if (this.userService.getUserToken().controller_scheme) {
      this.validateControllersNumber();
      if (this.isSignature && !this.isAdministrative) {
        return !this.controllersHaveErrors && !this.approversCismartHaveErrors && this.controllersNumber > 0;
      }
      return !this.controllersHaveErrors && !this.approversHaveErrors && this.approversNumber > 0 && this.controllersNumber > 0;
    }
    if (this.isSignature && !this.isAdministrative) {
      return !this.approversCismartHaveErrors;
    }
    return !this.approversHaveErrors && this.approversNumber > 0;
  }

  getApproversDto(): ApproversDto {
    return {
      accountId: this.approversRequest.accountId,
      batchId: this.approversRequest.batchId,
      isAuthorizerControl: this.approversRequest.isAuthorizerControl,
      operationTypeId: this.approversRequest.operationTypeId,
    };
  }

  validationCismart(): Observable<boolean> {
    const subject = new Subject<boolean>();
    if (this.amounts.length === 0 && this.amount) {
      this.amounts.push(this.amount);
    }
    const dto = new CismartApproversValidationDto({
      accountId: this.approversRequest.accountId,
      amount: this.amounts.reduce((a, b) => a + b, 0),
      currency: this.currency,
      authorizers: this.data.cismartApprovers,
    });

    if (this.isSignature && !this.isAdministrative) {
      this.approversAndControllersService.validateCismartApprovers(dto)
        .subscribe((res: CismartApproversValidationResult) => {
          if (!res.isValid) {
            this.messageService.danger('Error de Validación', res.errorMessage);
          }
          subject.next(res.isValid);
        }, error => {
          this.messageService.danger('Error en el servicio de Cismart', error.message);
          subject.next(false);
        });
    } else {
      return Observable.of(true);
    }
    return subject.asObservable();
  }

}
