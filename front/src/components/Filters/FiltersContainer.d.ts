import { AnyType } from "@common/types";
import { TableFilteringConfiguration } from "../../types";

export interface FiltersContainerProps {
  filtering: TableFilteringConfiguration;
  parentId?: string;
  pageId: string;
  onClose: () => void;
}
