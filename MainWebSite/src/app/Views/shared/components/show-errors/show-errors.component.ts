import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

  private static readonly errorMessages = {
    'required': () => 'Este campo es requerido',
    'minlength': (params) => 'El minimo de caracteres es: ' + params.requiredLength,
    'maxlength': (params) => 'El máximo de caracteres es: ' + params.requiredLength,
    'pattern': (params) => 'Se requiere el siguiente formato: ' + params.requiredPattern,
    'validate': (params) => params.message,
  };

  @Input() private control: AbstractControlDirective | AbstractControl;

  constructor() { }
  ngOnInit() {

  }

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

  get getControl() {
    return this.control;
  }
}
