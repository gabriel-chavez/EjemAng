import { Component, OnInit, forwardRef, Output, Input, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => { };

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true
    }
  ]
})
export class TagInputComponent implements OnInit, ControlValueAccessor {

  error = 'La entrada no corresponde a un formato de email válido';
  regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isError = false;
  tags: string[] = [];
  onTouchedCallback: () => void = noop;
  onChangeCallback: (_: any) => void = noop;

  @Input() removeLastOnBackspace = true;
  @Input() canDeleteTags = true;
  @Output() onTagsChanged = new EventEmitter();

  ngOnInit() { }

  removeLastTag(tagInput: HTMLInputElement): void {
    if (!this.removeLastOnBackspace || !this.tags.length) {
      return;
    }
    if (tagInput.value === '') {
      this.removeTag(this.tags[this.tags.length - 1]);
    }
  }

  addTag(tagInput: HTMLInputElement): void {
    if (tagInput.value.trim() !== '') {
      this.addPredefinedTag(tagInput.value);
    }
    tagInput.value = '';
  }

  addTagWithSemicolon(tagInput: HTMLInputElement): void {
    tagInput.value = tagInput.value.replace(';', '');
    this.addTag(tagInput);
  }

  verifyEmailFormat(tagInput: HTMLInputElement) {
    this.isError = !(tagInput.value.includes(';') || tagInput.value == '') ? !this.regexp.test(tagInput.value) : false;
  }

  addPredefinedTag(tag: string): void {
    this.tags.push(tag);
    this.onTagsChanged.emit(tag);
  }

  removeTag(tagToRemove: any): void {
    if (!this.isDeleteable(tagToRemove)) {
      return;
    }
    this.tags = this.tags.filter(tag => tagToRemove !== tag);
  }

  isDeleteable(tag: any) {
    if (typeof tag.deleteable !== 'undefined' && !tag.deleteable) {
      return false;
    }
    return this.canDeleteTags;
  }

  writeValue(value: any) {
    if (value !== this.tags) {
      this.tags = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
