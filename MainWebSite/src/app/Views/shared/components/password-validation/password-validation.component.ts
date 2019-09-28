import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../Services/users/user.service';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.css']
})
export class PasswordValidationComponent implements OnInit {

  accessNumber: string;
  password: string;
  isVirtualKeyboardVisible = false;
  @Output() onSubmit: EventEmitter<string> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.accessNumber = this.userService.getUserToken().unique_name;
  }

  handleClose() {
    this.onClose.emit(true);
    this.resetForm();
  }

  handleSubmit() {
    this.onSubmit.emit(this.password);
    this.resetForm();
  }

  resetForm() {
    this.password = '';
  }
}
