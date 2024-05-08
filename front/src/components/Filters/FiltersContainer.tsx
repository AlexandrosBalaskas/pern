import { FiltersContainerProps } from "./FiltersContainer.d";
import QuickDrawer from "../QuickDrawer/QuickDrawer";
import Filters from "./Filters";

const FiltersContainer = ({
  filtering,
  parentId,
  pageId,
  onClose,
}: FiltersContainerProps) => {
  return (
    <QuickDrawer
      drawerId={`${parentId}_${pageId}_filters-panel`}
      closeButtonId={`${pageId}-filter-close-btn`}
      title="searchText"
    >
      <Filters
        id={pageId}
        jsonSchema={filtering.schema || {}}
        uiSchema={filtering.uiSchema || {}}
        parentId={parentId}
        onClose={onClose}
      />
    </QuickDrawer>
  );
};

export default FiltersContainer;
