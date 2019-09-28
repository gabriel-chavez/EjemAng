import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/users/user.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css'],
})

export class HeaderLoginComponent implements OnInit {


  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  handleOpenLink(link: string) {
    window.open(link, '_blank');
  }

}
