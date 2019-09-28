export class ItemMenu {
  label: number;
  routerLink?: string;
  module?: string;
  items: ItemMenu[] = [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
