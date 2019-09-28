import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/users/user.service';
import { ItemMenu } from '../../../../Services/users/models/item-menu';
import { AuthenticationService } from '../../../../Services/users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu: ItemMenu[] = [];
  breadMenu: string;
  breadSubMenu: string;
  isVisibleCloseSession: boolean;
  currentUser: any;
  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.breadMenu = '';
    this.breadSubMenu = '';
    this.isVisibleCloseSession = false;
  }

  ngOnInit() {
    this.userService
      .getMenu()
      .subscribe(resp => {
        this.menu = resp.json();
      });
    this.currentUser = this.userService.getUserToken();
  }

  handleCloseModal() {
    this.isVisibleCloseSession = false;
  }

  handleCloseSession() {
    this.authenticationService.logout();
  }

  handleShowModalCloseSession() {
    this.isVisibleCloseSession = true;
  }
}
