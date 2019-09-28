import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { BallotOfWarrantyDto } from '../../../../Services/ballot-of-warranty/models/ballot-of-warranty-dto';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Constants } from '../../../../Services/shared/enums/constants';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PublicWritingDetailResult } from '../../../../Services/ballot-of-warranty/models/public-writing-detail-result';
import { BallotOfWarrantyService } from '../../../../Services/ballot-of-warranty/ballot-of-warranty.service';
import { AccountDto } from '../../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../../Services/shared/enums/account-use';
import { OperationType } from '../../../../Services/shared/enums/operation-type';
import { Roles } from '../../../../Services/shared/enums/roles';
import { AccountResult } from '../../../../Services/balances-and-movements/models/account-result';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SourceAccountsComponent } from '../../../shared/components/source-accounts/source-accounts.component';

@Component({
  selector: 'app-others-of-ballot',
  templateUrl: './others-of-ballot.component.html',
  styleUrls: ['./others-of-ballot.component.css'],
  providers: [ParametersService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OthersOfBallotComponent),
      multi: true
    }]
})
export class OthersOfBallotComponent implements OnInit, ControlValueAccessor {

  ballot: BallotOfWarrantyDto = new BallotOfWarrantyDto();
  @Input() disabled = false;
  @ViewChild('formComponent') form: NgForm;
  @ViewChild(SourceAccountsComponent) sourceAccountsComponent: SourceAccountsComponent;

  warranties: ParameterResult[] = [];
  publicDetailResult: PublicWritingDetailResult[] = [];
  constants = new Constants();
  types: string[] = ['P'];
  sourceAccountRequest: AccountDto = new AccountDto();

  constructor(private parameterService: ParametersService,
    private globalService: GlobalService,
    private ballotOfWarrantyService: BallotOfWarrantyService) {
  }

  ngOnInit() {
    const dto: ParameterDto = new ParameterDto();
    dto.group = Constants.TYPE_WARRANTY;
    this.parameterService.getByGroup(dto).subscribe((resp: ParameterResult[]) => {
      this.warranties = resp;
    }, (error) => this.globalService.danger('Servicio de Parametros', error.message));

    this.form.valueChanges.subscribe(value => {
      this.propagateChange(this.ballot);
    });
  }

  handleWarrantyChange() {
    if (this.ballot.currency && this.ballot.amount) {
      if (!this.sourceAccountRequest.currencies) {
        this.sourceAccountRequest = new AccountDto({
          accountUse: String.fromCharCode(AccountUse.debit),
          operationTypeId: [OperationType.boletaGarantia],
          roleId: Roles.initiator,
          types: this.types,
          currencies: [this.ballot.currency]
        });
      } else if (this.sourceAccountRequest.currencies[0] !== this.ballot.currency) {
        this.sourceAccountRequest = new AccountDto({
          accountUse: String.fromCharCode(AccountUse.debit),
          operationTypeId: [OperationType.boletaGarantia],
          roleId: Roles.initiator,
          types: this.types,
          currencies: [this.ballot.currency]
        });
      }

      if (this.ballot.typeWarranty === this.constants.CREDIT_LINE) {
        this.getPublicWriting();
      } else {
        this.ballot.publicWritingDetails = [];
      }
    } else {
      this.ballot.typeWarranty = null;
      this.globalService.danger('Advertencia', 'Debe seleccionar una moneda y monto válidos');
    }
  }

  getPublicWriting() {
    this.ballotOfWarrantyService.getPublicWritingDetail().subscribe((resp: PublicWritingDetailResult[]) => {
      this.publicDetailResult = resp;
      this.ballot.publicWritingDetails = this.publicDetailResult.map(x => {
        return {
          publicWritingNumber: x.publicWritingNumber,
          datePublicWriting: x.datePublicWriting,
          nameOfNotaryPublicFaith: x.nameOfNotaryPublicFaith
        };
      });
    }, (error) => this.globalService.danger('Servicio Boleta de Garantia', error.message));
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.ballot.sourceAccountId = $event.id;
    this.ballot.sourceAccount = $event.number;
    this.ballot.sourceCurrency = $event.currency;
  }

  handleValidate(): boolean {
    this.globalService.validateAllFormFields(this.form.form);
    return this.form.valid && this.sourceAccountsComponent.handleValidate();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.ballot = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  propagateChange = (_: any) => { };

}
