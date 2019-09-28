import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() template = 'master';
  klass: string
  constructor() {
  }

  ngOnInit() {
    if (this.template === 'login') {
      this.klass = 'col-no-padding col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2';
    }
    else {
      this.klass = 'col-no-padding col-xs-12';
    }
  }
}
