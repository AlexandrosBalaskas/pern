export interface FiltersProps {
  id: string;
  jsonSchema: { [key: string]: any };
  uiSchema: { [key: string]: any };
  parentId?: string;
  onClose?: () => void;
  closeOnClear?: boolean;
}
