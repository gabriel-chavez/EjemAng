import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/users/user.service';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.css']
})
export class CompanyNameComponent implements OnInit {

  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUserToken();
  }

}
