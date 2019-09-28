import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-description-payment',
  templateUrl: './description-payment.component.html',
  styleUrls: ['./description-payment.component.css']
})
export class DescriptionPaymentComponent implements OnInit {
  description: string;
  @Input() disabled: boolean;
  @Output() onChange = new EventEmitter<string>();
  @ViewChild('descriptionForm') form: NgForm;
  constructor() {
    this.description = '';
    this.disabled = false;
  }

  ngOnInit() {
  }

  handleSendDescription() {
    this.onChange.emit(this.description);
  }

  handleValidate() {
      return this.form.form.valid;
  }

}
