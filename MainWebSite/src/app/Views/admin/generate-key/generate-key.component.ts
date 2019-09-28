import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserPassword } from '../../../Services/users/models/new-password-model';
import { UserService } from '../../../Services/users/user.service';
import { GlobalService } from '../../../Services/shared/global.service';

@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  currentStep: number;
  accessNumber: string;
  newUserPassword: NewUserPassword = new NewUserPassword();
  constructor(private userService: UserService
    , private router: Router
    , private globalService: GlobalService) {
    this.accessNumber = '90000100000';
  }

  ngOnInit() {
    this.currentStep = 1;
  }

  handleSubmitStep1($event) {
    if ($event.isOk) {
      this.newUserPassword.accessNumber = $event.numberAccess;
      this.currentStep = 2;
    }
  }

  handleSubmitStep2($event) {
    if (!null) {
      this.newUserPassword = $event;
      this.currentStep = 3;
    }
  }

  handleSubmitStep3($event) {
    this.newUserPassword.card = $event.card;
    this.newUserPassword.pin = $event.pin;
    if ($event.isOk) {
      this.userService
        .createPassword(this.newUserPassword)
        .subscribe(res => {
          this.globalService.success('Mensaje', res.json(), false, true);
          this.router.navigate(['/login']);
        }, error => {
          if (error.status === 401 || error.status === 500) {
            this.globalService.danger('Alerta ', error.json());
            this.router.navigate(['/login']);
          } else {
            console.log('error servicio generar password');
          }
        });
    }
  }
}
