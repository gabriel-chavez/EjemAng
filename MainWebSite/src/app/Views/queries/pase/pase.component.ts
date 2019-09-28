import { Component, OnInit,NgModule } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-pase',
  templateUrl: './pase.component.html',
  styleUrls: ['./pase.component.css']
})
export class PaseComponent implements OnInit {
  public dateInitMain:Date=new Date();
  public dateEndMain: Date = new Date();
  constructor() { }

  ngOnInit() {
  }
  
}
