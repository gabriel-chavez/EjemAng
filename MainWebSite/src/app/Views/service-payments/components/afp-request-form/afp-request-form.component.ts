import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParameterResult } from '../../../../Services/parameters/models/parameter-result';
import { ParametersService } from '../../../../Services/parameters/parameters.service';
import { ParameterDto } from '../../../../Services/parameters/models/parameter-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { AfpService } from '../../../../Services/AFP/afp.service';
import { RequestModelsAfpquery } from '../../../../Services/AFP/Models/request-models-afpquery';
import { ResponseModelsAfpquery } from '../../../../Services/AFP/Models/response-models-afpquery';

@Component({
  selector: 'app-afp-request-form',
  templateUrl: './afp-request-form.component.html',
  styleUrls: ['./afp-request-form.component.css'],
  providers: [AfpService]
})
export class AfpRequestFormComponent implements OnInit {
  documentTypes: ParameterResult[];
  TypeCompanias: ParameterResult[];

  currentUser: any;
  data: RequestModelsAfpquery = new RequestModelsAfpquery();
  DetailAFPResponse: ResponseModelsAfpquery = new ResponseModelsAfpquery();
  isDisabledForm: boolean;

  @Output() emitEvent: EventEmitter<ResponseModelsAfpquery> = new EventEmitter<ResponseModelsAfpquery>();
  disabled: boolean = false;

  constructor(private parametersService: ParametersService,
    private globalService: GlobalService,
    private AfpService: AfpService
  ) {

  }

  ngOnInit() {
    this.getParameters();
    // this.currentUser = this.userService.getUserToken();
  }

  handleValidate() {

  }

  getParameters() {
    this.parametersService.getByGroup(new ParameterDto({ group: 'PASDOC' }))
      .subscribe(response => {
        this.documentTypes = response;

      }, error => this.globalService.danger('Parámetros', error));

    this.parametersService.getByGroup(new ParameterDto({ group: 'AFPTIP' }))
      .subscribe(response => {
        this.TypeCompanias = response;
      }, error => this.globalService.danger('Parámetros', error));
  }
  getDetail() {
    if (this.data.IdClient !== undefined && this.data.IdCompany !== undefined && this.data.Param2 !== undefined && this.data.Param3 !== undefined) {
      this.AfpService.getDetailAFP(this.data)
        .subscribe((response: ResponseModelsAfpquery) => {

          this.DetailAFPResponse = response;
          if (this.DetailAFPResponse.codeAnswer === '000') {
            this.disabled = true;
            this.emitEvent.emit(this.DetailAFPResponse);
          } else {
            this.disabled = false;
            this.globalService.warning('Fallo del Servicio: ', this.DetailAFPResponse.detailAnswer);
          }
        }, (error) => this.globalService.danger('Fallo del Servicio: ', error));
    } else {
      this.globalService.warning('Mensaje:Ingresar los datos requeridos ', this.DetailAFPResponse.detailAnswer);
    }
  }
}
