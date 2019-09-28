import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent implements OnInit {

  @Input() title: string = "Sección en Construcción";
  constructor() { }

  ngOnInit() {
  }

}
