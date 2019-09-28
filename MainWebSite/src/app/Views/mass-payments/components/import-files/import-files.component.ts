import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
    selector: 'app-import-files',
    templateUrl: './import-files.component.html',
    styleUrls: ['./import-files.component.css'],
})
export class ImportFilesComponent implements OnInit {
    file: FormData = new FormData();
    @Output() action = new EventEmitter();
    isValid = false;
    constructor(private messageService: GlobalService) {
    }

    ngOnInit() {
    }
    handleSendFile() {
        if (this.isValid) {
            this.action.emit(this.file);
        } else {
            this.messageService.info('Ningúna archivo selecionado:', 'Seleccione un archivo porfavor');
            return;
        }
    }
    onFileChange($event) {
        if ($event.target.files && $event.target.files.length > 0) {
            if (this.file.set !== undefined) {
                this.file.set('File', $event.target.files[0]);
                this.isValid = true;
            } else if (this.file.set === undefined) {
                this.file.append('File', $event.target.files[0]);
                this.isValid = true;
            }
        }
    }
}
