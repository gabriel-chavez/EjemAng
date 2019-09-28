import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { UserService } from '../../../../Services/users/user.service';
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  module: string = "";
  subModule: string = "";

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMenu().subscribe(resul => {
      const itemsMenu = resul.json();
      this.parseURL(this.router.url, itemsMenu);
      this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .subscribe((event) => {
          this.parseURL(this.router.url, itemsMenu);
        });
    });
  }

  parseURL(url: string, itemsMenu) {
    try {
      url = url.substring(1);
      const links = url.split('/');

      if (url != "" && links[0] != "login" && links.length > 1) {
        const moduleTemp = itemsMenu.find(x => x.module === links[0]);

        if (moduleTemp.items.length > 0) {
          this.module = moduleTemp.label;
          this.subModule = moduleTemp.items.find(x => x.routerLink === links[1]).label;
        } else {
          this.home();
        }
      }
      else {
        this.home();
      }
    } catch (error) {
      console.log(error);
    }
  }

  home() {
    this.module = "";
    this.subModule = "";
  }
}


