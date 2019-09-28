export interface ElementoMenu {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: ElementoMenu[];
}
