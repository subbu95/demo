// models/dropdown-item.model.ts
export interface DropdownItem {
    label: string;
    children?: DropdownItem[];
  }
  