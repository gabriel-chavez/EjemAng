import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/users/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../../Services/shared/data.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

  constructor(router: Router, public dataService: DataService) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.dataService.noAccounts = false;
        router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
  }
}
