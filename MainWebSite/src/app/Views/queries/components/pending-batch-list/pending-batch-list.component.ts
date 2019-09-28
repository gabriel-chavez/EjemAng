import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../../Services/authorization/authorization.service';
import { BatchDetail } from '../../../../Services/authorization/models/batch-detail';
import { ProcessBatch } from '../../../../Services/authorization/models/process-batch';
import { DataService } from '../../../../Services/shared/data.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UserService } from '../../../../Services/users/user.service';
import { InputApprovers } from '../../../../Services/approvers-and-controllers/models/input-approvers';
import { Constants } from '../../../../Services/shared/enums/constants';
import { OperationType } from '../../../../Services/shared/enums/operation-type';

@Component({
  selector: 'app-pending-batch-list',
  templateUrl: './pending-batch-list.component.html',
  styleUrls: ['./pending-batch-list.component.css'],
  providers: [AuthorizationService]
})

export class PendingBatchListComponent implements OnInit {

  batchId: number;
  operationTypeId: number;
  rejectionCause: string;
  showRejectBatchForm = false;
  showAuthorizersOrControllers = false;
  showBatchDetail = false;
  pageItems: number = 10;
  role: string;
  isAdministrative = false;
  operationType: string;
  controllerScheme = false;
  approversDto: InputApprovers;
  batchIdsToControl: number[] = [];
  batchIdsToAuthorize: number[] = [];
  batchIdsToReject: number[] = [];
  totalBatchesToControl = 0;
  totalBatchesToAuthorize = 0;
  allBatchesToControlSelected = false;
  allBatchesToAuthorizeSelected = false;
  administrativeRolesOperations: number[] = [OperationType.formularioSolicitud, OperationType.boletaGarantia, OperationType.formularioModificacion];
  batchesToControl: BatchDetail[] = [];
  batchesToAuthorize: BatchDetail[] = [];
  batchesToControlPerPage: BatchDetail[] = [];
  batchesToAuthorizePerPage: BatchDetail[] = [];
  @Output() onChange: EventEmitter<ProcessBatch> = new EventEmitter();
  @ViewChild('rejectBatchForm') form: NgForm;

  constructor(private authorizationService: AuthorizationService, private globalService: GlobalService, private router: Router, private dataService: DataService, private userService: UserService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.controllerScheme = this.userService.getUserToken().controller_scheme;
    this.authorizationService.getPendingBatches()
      .subscribe(response => {
        this.batchesToControl = response.batchesToControl;
        this.totalBatchesToControl = response.batchesToControl.length;
        this.batchesToAuthorize = response.batchesToAuthorize;
        this.totalBatchesToAuthorize = response.batchesToAuthorize.length;
        const pageInit = 1;
        if (this.batchesToControl && this.batchesToControl.length > 0) {
          this.batchesToControlPerPage = this.batchesToControl.slice(((pageInit - 1) * this.pageItems), this.pageItems * pageInit);
        }
        if (this.batchesToAuthorize && this.batchesToAuthorize.length > 0) {
          this.batchesToAuthorizePerPage = this.batchesToAuthorize.slice(((pageInit - 1) * this.pageItems), this.pageItems * pageInit);
        }
      }, error => this.globalService.warning('Autorización', error.message));
  }

  handleBatchesToControlPageChanged($event: number) {
    this.allBatchesToControlSelected = false;
    this.handleAllBatchesToControlChecked();
    this.batchesToControlPerPage = this.batchesToControl.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  handleBatchesToAuthorizePageChanged($event: number) {
    this.handleAllBatchesToAuthorizeChecked();
    this.allBatchesToAuthorizeSelected = false;
    this.batchesToAuthorizePerPage = this.batchesToAuthorize.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  handleBatchToControlChecked(batch: BatchDetail) {
    this.batchIdsToControl = this.changeStatus(batch.isSelected, this.batchIdsToControl, batch.id);
  }

  handleBatchToAuthorizeChecked(batch: BatchDetail) {
    this.batchIdsToAuthorize = this.changeStatus(batch.isSelected, this.batchIdsToAuthorize, batch.id);
  }

  handleAllBatchesToControlChecked() {
    this.batchIdsToControl = [];
    for (const batch of this.batchesToControlPerPage) {
      batch.isSelected = this.allBatchesToControlSelected;
      this.batchIdsToControl = this.changeStatus(this.allBatchesToControlSelected, this.batchIdsToControl, batch.id);
    }
  }

  handleAllBatchesToAuthorizeChecked() {
    this.batchIdsToAuthorize = [];
    for (const batch of this.batchesToAuthorizePerPage) {
      batch.isSelected = this.allBatchesToAuthorizeSelected;
      this.batchIdsToAuthorize = this.changeStatus(this.allBatchesToAuthorizeSelected, this.batchIdsToAuthorize, batch.id);
    }
  }

  handleRejectBatch() {
    this.globalService.validateAllFormFields(this.form.form);
    if (this.form.valid) {
      this.showRejectBatchForm = false;
      this.onChange.emit(new ProcessBatch({ batchIds: this.batchIdsToReject, operation: 3, rejectionCause: this.rejectionCause }));
    }
  }

  handleShowBatchDetail(batch: BatchDetail) {
    this.operationType = batch.operationType;
    this.operationTypeId = batch.operationTypeId;
    this.batchId = batch.id;
    this.showBatchDetail = true;
  }

  handleShowBatchAuthorizersOrControllers(batch: BatchDetail, role: string) {
    this.role = role;
    this.showAuthorizersOrControllers = true;
    this.operationType = batch.operationType;
    this.isAdministrative = this.administrativeRolesOperations.includes(batch.operationTypeId);
    this.approversDto = new InputApprovers({
      operationTypeId: batch.operationTypeId,
      batchId: batch.id,
      isAuthorizerControl: batch.isAuthorizerControl,
      accountId: batch.accountId,
      accountNumber: batch.account
    });
  }

  handleBatchesToControl() {
    this.onChange.emit(new ProcessBatch({ batchIds: this.batchIdsToControl, operation: 1, rejectionCause: '' }));
  }

  handleBatchesToAuthorize() {
    this.onChange.emit(new ProcessBatch({ batchIds: this.batchIdsToAuthorize, operation: 2, rejectionCause: '' }));
  }

  changeStatus(selected: boolean, array: number[], item: number): number[] {
    if (selected) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item, 0), 1);
    }
    return array;
  }

  handleChangeDetail() {
    this.getList();
  }

}
