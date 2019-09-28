import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.css']
})
export class InformationPanelComponent implements OnInit {

  @Input() message: string;
  constructor() {
    this.message = 'No existen datos para la operación';
   }

  ngOnInit() {
  }

}
