import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../Services/authorization/authorization.service';
import { BatchStatus } from '../../../Services/authorization/models/batch-status';
import { ProcessBatch } from '../../../Services/authorization/models/process-batch';
import { DataService } from '../../../Services/shared/data.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/users/user.service';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css'],
  providers: [AuthorizationService, UserService]
})
export class PendingsComponent implements OnInit {

  isCredentialsValidationVisible = false;
  processBatchData: ProcessBatch = new ProcessBatch();
  validatePasswordInsteadToken: boolean;

  constructor(private authorizationService: AuthorizationService, private globalService: GlobalService,
    private dataService: DataService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.validatePasswordInsteadToken = this.userService.getUserToken().authorize_pin;
  }

  handleProcessBatches($event: ProcessBatch) {
    this.isCredentialsValidationVisible = true;
    this.processBatchData = $event;
  }

  handleCredentialsValidationSubmit($event: any) {
    if (typeof $event === 'string') {
      this.processBatchData.password = $event;
    } else {
      this.processBatchData.tokenCode = $event.code;
      this.processBatchData.tokenName = $event.name;
    }
    this.authorizationService.processBatches(this.processBatchData)
      .subscribe(response => {
        this.dataService.serviceData = response;
        this.router.navigate(['queries/batch-status']);
      }, error => this.globalService.danger('Autorización', error.message));
  }

}
