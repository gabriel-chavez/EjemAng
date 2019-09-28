import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/users/user.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  currentUser: any;
  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.currentUser = this.userService.getUserToken();
  }

}
