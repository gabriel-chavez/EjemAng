import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { GlobalService } from '../../../../Services/shared/global.service';
import { NgForm } from '@angular/forms';
import { TransfersAbroadService } from '../../../../Services/transfers-abroad/transfer-abroad.service';
import { TransferAbroadFrecuent } from '../../../../Services/transfers-abroad/models/transfer-abroad-frecuent';
import { TransferAbroadFrecuentDto } from '../../../../Services/transfers-abroad/models/transfer-abroad-frecuent-dto';
import { TransferAbroadFrecuentResult } from '../../../../Services/transfers-abroad/models/transfer-abroad-frecuent-result';

@Component({
    selector: 'app-frecuent-transfers-abroad',
    templateUrl: './frecuent-transfers-abroad.component.html',
    styleUrls: ['./frecuent-transfers-abroad.component.css'],
    providers: [TransfersAbroadService]
})
export class FrecuentTransfersAbroadComponent implements OnInit {

    frecuents: TransferAbroadFrecuentResult[] = [];
    frecuentSelected: TransferAbroadFrecuentResult = null;
    frecuentDeleteSelected: TransferAbroadFrecuentResult = null;
    isCheckedFrecuentTransfer: false;
    isRemoveModalVisible = false;
    @Output() onChange = new EventEmitter<TransferAbroadFrecuentResult>();
    @Output() onUpdateFrecuent = new EventEmitter<TransferAbroadFrecuentResult>();

    constructor(private transfersAbroadService: TransfersAbroadService,
        private globalService: GlobalService) {
    }

    ngOnInit() {
        this.getFrecuents();
    }

    getFrecuents() {
        this.frecuentSelected = null;
        this.transfersAbroadService
            .getTransferFrecuents()
            .subscribe((res: TransferAbroadFrecuentResult[]) => {
                this.frecuents = res;
            });
    }

    handleChangedFrecuentTransfer() {
        this.onChange.emit(this.frecuentSelected);
    }

    handleUpdatefrecuentTransfer() {
        this.onUpdateFrecuent.emit(this.frecuentSelected);
    }

    showRemoveModal() {
        this.frecuentDeleteSelected = null;
        this.isRemoveModalVisible = true;
    }

    handleRemovefrecuentTransfer() {
        const remove: TransferAbroadFrecuentDto = new TransferAbroadFrecuentDto();
        remove.processBatchFrecuentId = this.frecuentDeleteSelected.id;
        this.transfersAbroadService
            .removeFrecuentTransfer(remove)
            .subscribe(res => {
                this.getFrecuents();
                this.isRemoveModalVisible = false;
                this.globalService.success('Mensaje:', 'Se eliminó correctamente la transferencia frecuente');
            }, error => {
                this.globalService.danger('Error:', 'Ocurrio un error, por favor intente mas tarde o comuníquese con el administrador del sistema');
            });
    }
}
