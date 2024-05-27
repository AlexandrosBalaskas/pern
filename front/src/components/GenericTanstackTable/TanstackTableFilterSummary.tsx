import React, { useCallback } from "react";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";
import useTable from "../../store/table/useTable";
import { Chip, Theme, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const jsonMap: any = {
  type: "account_type",
  parentaccount: "accounts",
  caseorigin: "case_origin",
  status: "case_status",
  priority: "priority",
  contactname: "contacts",
  accountname: "accounts",
  salutation: "salutation",
  reportsto: "contacts",
  leadstatus: "lead_status",
  industry: "industry",
  leadsource: "lead_source",
  stage: "stage",
  forecastcategory: "forecast_category",
  productfamily: "product_families",
  relatedto: "related_to",
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    tableFiltersSummaryContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      backgroundColor: "inherit",
      width: "100%",
      position: "relative",
      top: "50px",
    },
    tableFiltersSummaryChip: {
      margin: "5px",
      maxWidth: 400,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };
});

const TableFiltersSummary = ({ tableId }: { tableId: string }) => {
  const styles = useStyles();
  const { t: translate } = useTranslation([tableId, "common", "codelist"]);
  const codelists = useSelector((state: any) => state.Codelists);

  const { criteria = {}, applyCriteria } = useTable(tableId);

  const onDeleteCriterion = (
    filters: any,
    criterionId: any,
    criterionValue = ""
  ) => {
    const finalCriteria = { ...filters };
    const value = finalCriteria[criterionId];
    if (Array.isArray(value)) {
      finalCriteria[criterionId] = finalCriteria[criterionId].filter(
        (v: any) => v !== criterionValue
      );
    } else {
      delete finalCriteria[criterionId];
    }

    applyCriteria(finalCriteria);
  };

  const renderChip = useCallback(
    (criterion: string, value: string, onDelete: any) => {
      let finalValue = value || "";

      const codelist =
        codelists &&
        codelists[jsonMap[criterion]] &&
        codelists[jsonMap[criterion]].data &&
        codelists[jsonMap[criterion]].data.items;

      const codelistItem = (codelist || []).find(
        (item: any) => item.code == value
      );

      console.log(
        codelists,
        "codelists",
        tableId,
        "TABLEID",
        codelist,
        "codelist",
        codelistItem,
        "codelistitem"
      );

      const formattedValue = finalValue.toString().replace(/:\s*/g, ".");
      const translatedLabel = `${translate(criterion)}: ${translate(
        codelistItem?.label,
        { ns: "codelist" }
      )}`;

      return (
        <Tooltip title={translatedLabel} placement="top">
          <Chip
            key={`${criterion}-${(value || "").toString()}`}
            id={`table-filter-${value}`}
            clickable
            label={translatedLabel}
            onDelete={onDelete}
            color="primary"
            size="medium"
            variant="outlined"
            className={styles.tableFiltersSummaryChip}
          />
        </Tooltip>
      );
    },
    [translate, tableId, codelists]
  );

  const renderChips = (allCriteria: any) => {
    const allChips: Array<JSX.Element> = [];
    Object.keys(allCriteria || {}).forEach((c) => {
      console.log(c, "c", allCriteria[c], "val");
      const onDelete = () => onDeleteCriterion(allCriteria, c);
      allChips.push(renderChip(c, allCriteria[c], onDelete));
    });

    return allChips;
  };

  const hasCriteria = !!Object.keys(criteria).length;

  if (!hasCriteria) {
    return null;
  }

  return (
    <div className={styles.tableFiltersSummaryContainer} id="filters-container">
      {renderChips(criteria)}
    </div>
  );
};

export default TableFiltersSummary;
