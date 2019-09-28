import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ElementoMenu } from '../../../modelos/genericos/elemento-menu';
import { NavegacionMenuService } from '../../../servicios/genericos/navegacion-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elemento-menu',
  templateUrl: './elemento-menu.component.html',
  styleUrls: ['./elemento-menu.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class ElementoMenuComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: ElementoMenu;
  @Input() depth: number;

  constructor(public servicioNavegacionMenu: NavegacionMenuService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.servicioNavegacionMenu.currentUrl.subscribe((url: string) => {
      this.expanded = false;
      this.ariaExpanded = false;
    });
  }

  onItemSelected(item: ElementoMenu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.servicioNavegacionMenu.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
