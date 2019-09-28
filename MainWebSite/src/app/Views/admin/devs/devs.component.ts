import { Component, OnInit, ViewChild } from '@angular/core';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component'
import { UserService } from '../../../Services/users/user.service';
import { GlobalService } from '../../../Services/shared/global.service';
// import { AditionalDataTransfer } from './../../../Models/transfers/aditionalDataTransfer';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { UtilsService } from '../../../Services/shared/utils.service';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.css'],
  providers: [UserService, UtilsService],
})
export class DevsComponent implements OnInit {

  textKeyboard: string = '';
  @ViewChild(CaptchaComponent) captcha: CaptchaComponent;
  password = 'secret';
  show = false;

  isVisible: boolean = false;
  isVisibleToken: boolean = false;
  date: Date;
  // dataTransfer: AditionalDataTransfer = new AditionalDataTransfer();
  txtPassword: string = '';
  inputPassword = '';
  hiddenPassword = '';

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'dd/mm/yyyy',
    inline: false,
  };

  //pagination
  totalItems: number = 90;
  currentPage: number = 0;

  // public modelDate: IMyDateModel;
  public modelDate: any = { date: { year: 2018, month: 10, day: 9 } };
  constructor(private messageService: GlobalService, private utilsService: UtilsService) { }

  ngOnInit() {

    this.modelDate;
    this.modelDate.date = this.utilsService.getToday();
    //this.myDatePickerOptions.disableUntil = this.utilsService.getToday();
  }

  handleKeyboard($event) {
    if ($event === "back") {
      this.textKeyboard = this.textKeyboard.substring(0, this.textKeyboard.length - 1);
    }
    else {
      this.textKeyboard = this.textKeyboard + $event;
    }
  }

  handleVerifyStrength($event) {

  }

  handleMessage($event) {
    switch ($event) {
      case 'success':
        this.messageService.success("titulo", "detale del mensaje");
        break;
      case 'danger':
        this.messageService.danger("titulo", "detale del mensaje");
        break;
      case 'info':
        this.messageService.info("titulo", "detale del mensaje");
        break;
      case 'warning':
        this.messageService.warning("titulo", "detale del mensaje");
        break;
      default:
        break;
    }
  }

  handleOpenModal() {
    this.isVisible = true;
  }

  handleCloseModal() {
    this.isVisible = false;
  }

  handleTokenSubmit($event) {
    alert(JSON.stringify($event));
    this.isVisibleToken = false;
  }

  handleTokenOpen() {
    this.isVisibleToken = true;
  }

  onDateChanged(event: IMyDateModel) {
    // this.dataTransfer.dateFuture = event.jsdate;
  }

  submitForm() {
    // alert(JSON.stringify(this.dataTransfer));
  }

  handleChangePage($event) {
    this.currentPage = $event;
  }

  handleTestPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
