import { FiltersContainerProps } from "./FiltersContainer.d";
import QuickDrawer from "../QuickDrawer/QuickDrawer";
import Filters from "./Filters";
import { useTranslation } from "react-i18next";

const FiltersContainer = ({
  filtering,
  parentId,
  pageId,
  onClose,
}: FiltersContainerProps) => {
  const { t: translate } = useTranslation("common");

  return (
    <QuickDrawer
      drawerId={`${parentId}_${pageId}_filters-panel`}
      closeButtonId={`${pageId}-filter-close-btn`}
      title={translate("searchText")}
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
