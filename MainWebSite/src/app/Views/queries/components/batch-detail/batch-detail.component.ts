import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../Services/shared/data.service';
import { Constants } from '../../../../Services/shared/enums/constants';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.css']
})
export class BatchDetailComponent implements OnInit {

  @Input() operation: string;
  @Input() batchId: number;
  @Input() operationTypeId: number;
  @Input() isShow: boolean;
  @Input() isAuthorize: boolean;
  @Output() onChangeDetail = new EventEmitter();

  constants: Constants = new Constants();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  handleChangeDetail() {
    this.onChangeDetail.emit();
  }

}
