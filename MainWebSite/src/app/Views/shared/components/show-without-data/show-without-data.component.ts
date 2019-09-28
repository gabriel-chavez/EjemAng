import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-without-data',
  templateUrl: './show-without-data.component.html',
  styleUrls: ['./show-without-data.component.css']
})
export class ShowWithoutDataComponent implements OnInit {
  @Input() message: string;
  constructor() {
    this.message = 'No existen datos que mostrar';
   }

  ngOnInit() {
  }

}
