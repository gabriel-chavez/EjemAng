import { Directive, Input, ElementRef, Inject, Provider, forwardRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[mask-money]',
  host: {
    '(input)': 'maskValue($event.target.value)',
    '(blur)': 'onTouched($event)',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskMoneyDirective),
    multi: true
  }]
})

export class MaskMoneyDirective implements ControlValueAccessor {

  constructor( @Inject(Renderer) private renderer: Renderer, @Inject(ElementRef) private element: ElementRef) { }
  integerPart: string;
  decimalPart: string;
  maskedValue: string;

  writeValue(value: any) {
    if (value === undefined || value === null) {
      this.renderer.setElementProperty(this.element.nativeElement, 'value', '');
    } else {
      if (value) {
        this.maskValue(value);
      } else {
        this.renderer.setElementProperty(this.element.nativeElement, 'value', 0);
      }
    }
  }

  maskValue(value) {
    const unmaskedValue = value.toString().replace(new RegExp(/[^.\d]/, 'g'), '');
    this.integerPart = unmaskedValue.split('.')[0];
    this.decimalPart = unmaskedValue.split('.')[1];
    this.maskedValue = '';
    this.addCommas();
    if (this.decimalPart !== undefined) {
      this.maskedValue = this.maskedValue + '.' + this.decimalPart.slice(0, 2);
      this.propagateChange(this.integerPart + '.' + this.decimalPart.slice(0, 2));
    } else {
      this.propagateChange(this.integerPart);
    }
    this.renderer.setElementProperty(this.element.nativeElement, 'value', this.maskedValue);
  }

  addCommas() {
    let cont = 0;
    for (let i = this.integerPart.length; i > 0; i--) {
      if (cont === 2 && i > 1) {
        this.maskedValue = ',' + this.integerPart.slice(i - 1, i) + this.maskedValue;
        cont = 0;
      } else {
        this.maskedValue = this.integerPart.slice(i - 1, i) + this.maskedValue;
        cont++;
      }
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public onTouched: any = () => { };

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
