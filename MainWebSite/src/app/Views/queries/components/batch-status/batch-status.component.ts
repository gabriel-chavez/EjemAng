import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../Services/shared/data.service';
import { BatchStatus } from '../../../../Services/authorization/models/batch-status';

@Component({
  selector: 'app-batch-status',
  templateUrl: './batch-status.component.html',
  styleUrls: ['./batch-status.component.css']
})
export class BatchStatusComponent implements OnInit {

  batches: BatchStatus[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.batches = this.dataService.serviceData;
  }

}
