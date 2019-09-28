import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InputApprovers } from '../../../../Services/approvers-and-controllers/models/input-approvers';
import { ProcessBatch } from '../../../../Services/authorization/models/process-batch';
import { DataService } from '../../../../Services/shared/data.service';
import { OperationType } from '../../../../Services/shared/enums/operation-type';
import { GlobalService } from '../../../../Services/shared/global.service';
import { TrackTransfersDto } from '../../../../Services/track-transfers/models/track-transfers-dto';
import { TrackTransfersResult } from '../../../../Services/track-transfers/models/track-transfers-result';
import { TrackTransfersService } from '../../../../Services/track-transfers/track-transfers.service';
import { UserService } from '../../../../Services/users/user.service';

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.css'],
  providers: [TrackTransfersService]
})
export class TrackingListComponent implements OnInit {

  formatSelected: string;
  nameReport = 'Seguimiento de operaciones';
  companyName: string;
  batchId: number;
  operationTypeId: number;
  showBatchDetail = false;
  role: string;
  isAdministrative = false;
  showAuthorizersOrControllers = false;
  operationType: string;
  approversDto: InputApprovers;
  totalTracks: number;
  allTracksSelected = false;
  tracksLength = 0;
  pageSize = 10;
  allBatchesSelected = false;
  tracksPerPage: TrackTransfersResult[] = [];
  batches: TrackTransfersResult[] = [];
  listTracks: TrackTransfersResult[] = [];
  administrativeRolesOperations: number[] = [OperationType.formularioSolicitud, OperationType.boletaGarantia, OperationType.formularioModificacion];
  @Input() order: boolean;
  @Input() tracks: TrackTransfersResult[] = [];
  @Input() tracksDto: TrackTransfersDto = new TrackTransfersDto();
  @Output() onChange: EventEmitter<ProcessBatch> = new EventEmitter();


  constructor(private userService: UserService, private trackTransfersService: TrackTransfersService, private globalService: GlobalService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.tracksLength = this.tracks.length;
    this.companyName = this.userService.getUserToken().company_name;
  }

  handleShowBatchDetail(batch: TrackTransfersResult) {
    this.operationType = batch.name;
    this.operationTypeId = batch.operationTypeId;
    this.batchId = batch.id;
    this.showBatchDetail = true;
  }
  handleShowBatchAuthorizersOrControllers(batch: TrackTransfersResult, role: string) {
    this.role = role;
    this.showAuthorizersOrControllers = true;
    this.operationType = batch.name;
    this.isAdministrative = this.administrativeRolesOperations.includes(batch.operationTypeId);
    this.approversDto = new InputApprovers({
      operationTypeId: batch.operationTypeId,
      batchId: batch.id,
      isAuthorizerControl: batch.isAuthorizerControl,
      accountId: batch.accountId,
      accountNumber: batch.formattedAccount,
      isSignerScheme: batch.isSignerScheme
    });
  }

  handlePageChanged($event: number) {
    this.listTracks = this.tracks.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  getReport() {
    if (this.formatSelected != null) {
      if (this.tracksDto.EndDate == null || this.tracksDto.InitialDate == null) {
        this.globalService.warning('Exportar', 'Para exportar se deber seleccionar un rango de fecha de 5 días');
      } else {
        this.tracksDto.ReportType = this.formatSelected;
        this.trackTransfersService.getReportOperations(this.tracksDto)
          .subscribe((resp: Blob) => {
            if (navigator.msSaveBlob) {
              return navigator.msSaveOrOpenBlob(resp, this.nameReport);
            }

            const data = window.URL.createObjectURL(resp);
            const link = document.createElement('a');
            link.href = data;
            link.download = (this.nameReport + '_' + this.companyName).replace(/\./gi, " ");
            link.click();
          }, (error) => this.globalService.danger('Fallo del export: ', error.message));
      }
    } else {
      this.globalService.warning('Exportar', 'Debe escoger el formato de archivo a exportar');
    }
  }

}
