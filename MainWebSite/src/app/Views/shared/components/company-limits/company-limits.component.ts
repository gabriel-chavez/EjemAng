import { Component, OnInit, Input } from '@angular/core';
import { LimitsService } from '../../../../Services/limits/limits.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { CompanyLimitsResult } from '../../../../Services/limits/models/company-limits-result';

@Component({
  selector: 'app-company-limits',
  templateUrl: './company-limits.component.html',
  styleUrls: ['./company-limits.component.css'],
  providers: [LimitsService]
})
export class CompanyLimitsComponent implements OnInit {

  limits: CompanyLimitsResult = new CompanyLimitsResult();
  @Input() isVisible: boolean;
  @Input() showAuthorizerLimit = false;

  constructor(private limitsService: LimitsService,
    private messageService: GlobalService) {
    this.isVisible = true;
  }

  ngOnInit() {
    this.limitsService.getCompanyLimits()
      .subscribe(response => this.limits = response, error => this.messageService.warning('Servicio de límites', error.message));
  }

}
