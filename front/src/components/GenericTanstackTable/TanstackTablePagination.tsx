import { useTranslation } from "react-i18next";
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";

export const TanstackTablePagination = ({
  table,
  count,
  pagination,
  pageId,
}: {
  table: any;
  count: number;
  pagination: any;
  pageId: string;
}) => {
  const { t: translate } = useTranslation("common");
  return (
    <div
      className="flex items-center gap-2"
      style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
    >
      <div style={{ marginLeft: "25px" }}> {translate("rowsPerPages")}</div>
      <select
        style={{ marginRight: "35px", marginLeft: "5px" }}
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 15].map((pageSize) => (
          <>
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          </>
        ))}
      </select>
      <span
        className="flex items-center gap-1"
        style={{ display: "flex", height: "30px", marginRight: "35px" }}
      >
        <div>{translate("page")} </div>
        <strong>
          {Math.ceil(table.getState().pagination.pageIndex + 1)} of{" "}
          {count ? Math.ceil(count / pagination.pageSize) : 0}
        </strong>
      </span>
      <AppIconButton
        id={`${pageId}-first-page-btn`}
        label={translate("goToFirstPage")}
        className="border rounded p-1"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
        icon={<Assets input="icons" name="FirstPage" />}
      />
      <AppIconButton
        id={`${pageId}-previous-page-btn`}
        label={translate("goToPreviousPage")}
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        icon={<Assets input="icons" name="KeyboardArrowLeft" />}
      />
      <AppIconButton
        id={`${pageId}-next-page-btn`}
        label={translate("goToNextPage")}
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        icon={<Assets input="icons" name="KeyboardArrowRight" />}
      />
      <AppIconButton
        id={`${pageId}-lase-page-btn`}
        label={translate("goToLastPage")}
        className="border rounded p-1"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
        icon={<Assets input="icons" name="LastPage" />}
      />
    </div>
  );
};
