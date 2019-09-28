import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckResult } from '../../../../Services/checks/models/check-result';
import { ChecksService } from '../../../../Services/checks/checks.service';
import { CheckDto } from '../../../../Services/checks/models/check-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-list-check-sent',
  templateUrl: './list-check-sent.component.html',
  styleUrls: ['./list-check-sent.component.css'],
  providers: [ChecksService]
})
export class ListCheckSentComponent implements OnInit {

  @Input() checks: CheckResult[] = [];

  @Output() onSubmit = new EventEmitter<CheckDto>();

  constructor(private checksService: ChecksService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  handleShowDetails(_idCheck) {
    const dataReport: CheckDto = new CheckDto();
    dataReport.idCheck = _idCheck;

    this.checksService.getImage(dataReport)
      .subscribe((resp: CheckResult) => {
        this.onSubmit.emit(resp);
      }, (error) => this.globalService.danger('Fallo del Servicio checks.getImage: ', error.message));
  }
}
