import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  LinearProgress,
  Button,
  Theme,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTable from "../../store/table/useTable";
import useDrawer from "../../store/drawer/useDrawer";
import AppIconButton from "../AppIconButton/AppIconButton";
import { useTranslation } from "react-i18next";
import { Assets } from "../Assets/Assets";
import MenuActionButton from "../ActionButtons/MenuButton";
import FiltersContainer from "../Filters/FiltersContainer";
import { TanstackTablePagination } from "./TanstackTablePagination";
import { makeStyles } from "@mui/styles";
import SortButton from "../Sort/Sort";
import { isUndefined } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: { display: "flex", flexDirection: "row", fontWeight: 600 },
  filterContainer: {
    position: "relative",
    left: "calc(100% - 85px)",
    top: "16px",
    width: "fit-content",
    height: "40px",
  },
  titleContainer: {
    position: "absolute",
    height: "50px",
    padding: "16px 16px 0px",
  },
}));

const TanstackTable = ({
  pageId,
  columns,
  filtering,
  rowButtons,
}: {
  pageId: string;
  columns: any;
  filtering: any;
  rowButtons: any;
}) => {
  const arr: any = [];
  const navigate = useNavigate();
  const { t: translate } = useTranslation([pageId, "common", "codelist"]);
  const columnHelper = createColumnHelper();

  const codelists = useSelector((state: any) => state.Codelists);
  const finalColumns = useMemo(
    () =>
      columns.map((column: any) =>
        column.codelist
          ? columnHelper.accessor(column.accessorKey, {
              cell: (props: any) => {
                const codelist =
                  codelists &&
                  codelists[column.codelist] &&
                  codelists[column.codelist].data &&
                  codelists[column.codelist].data.items;

                const codelistItem = (codelist || []).find(
                  (item: any) => item.code == props.getValue()
                );
                return translate(codelistItem?.label, { ns: "codelist" });
              },
              header: column.header,
            })
          : column
      ),
    [translate, columns, codelists]
  );
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [sorting, setSorting] = useState(arr);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState(arr);
  const styles = useStyles();
  const parentId = "Tanstack";

  const { criteria, loadTable, initTable, data, count, loading, deleteSw } =
    useTable(pageId);

  const { groups } = rowButtons;

  const { open, openDrawer, closeDrawer } = useDrawer(
    `${parentId}_${pageId}_filters-panel`
  );

  const finalActions = useMemo(() => {
    return groups;
  }, [groups]);

  useEffect(() => {
    initTable({ loading: false });
  }, [pageId]);

  const sort = useMemo(() => {
    return sorting.length
      ? { sort: `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}` }
      : null;
  }, [sorting]);

  const finalPagination = useMemo(() => {
    return {
      current_page: Math.ceil(pagination.pageIndex),
      pageSize: pagination.pageSize,
    };
  }, [pagination]);

  useEffect(() => {
    !loading &&
      loadTable({
        params: {
          ...sort,
          ...finalPagination,
          filters: JSON.stringify(criteria),
        },
        tableId: pageId,
        pageId,
      });
  }, [sort, finalPagination, criteria, deleteSw, pageId]);

  useEffect(() => {
    !isUndefined(deleteSw) && setSnackBarOpen(true);
  }, [deleteSw]);

  useEffect(() => {
    snackBarOpen &&
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 6000);
  }, [snackBarOpen]);

  const table = useReactTable({
    data: data,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    sortDescFirst: false,
    onSortingChange: setSorting,
    manualSorting: true,
    pageCount: count ? (Math.ceil(count / 10) * 10) / pagination.pageSize : 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleFilters = useCallback(() => {
    open ? closeDrawer() : openDrawer();
  }, [open, openDrawer, closeDrawer]);

  const redirectToPage = useCallback(() => {
    navigate(`/page/${pageId}`);
  }, [pageId]);
  // const onCall = () => {
  //   setIsCall(!isCall);
  // };

  return (
    <>
      <FiltersContainer
        pageId={pageId}
        parentId={parentId}
        filtering={filtering}
        onClose={toggleFilters}
      />
      <TableContainer component={Paper}>
        {loading && <LinearProgress />}
        <h1 className={styles.titleContainer}>{translate(pageId)}</h1>
        <div className={styles.filterContainer}>
          <AppIconButton
            id={"Tanstack-add-btn"}
            label={translate("add", { ns: "common" })}
            onClick={redirectToPage}
            icon={
              <Assets
                input="icons"
                name="AddCircle"
                props={{ className: "primary" }}
              />
            }
          />
          <AppIconButton
            id={"Tanstack-filter-btn"}
            label={translate("filter", { ns: "common" })}
            onClick={toggleFilters}
            icon={
              <Assets
                input="icons"
                name="Search"
                props={{ className: "primary" }}
              />
            }
          />
        </div>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id}>
                      <div className={styles.headerContainer}>
                        {header.isPlaceholder
                          ? null
                          : translate(
                              `${flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}`
                            )}
                        <SortButton header={header}></SortButton>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {rowButtons && (
                  <TableCell
                    width={30}
                    component="td"
                    scope="row"
                    align="right"
                  >
                    <MenuActionButton
                      actions={finalActions}
                      id={row
                        .getAllCells()
                        .find((cell) => cell.column.id === "id")
                        ?.getValue()}
                      // onCall={onCall}
                      pageId={pageId}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TanstackTablePagination
          table={table}
          count={count}
          pagination={pagination}
          pageId={pageId}
        />
      </TableContainer>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} color="dark">
        <Alert
          onClose={() => {
            setSnackBarOpen(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: "max-content" }}
        >
          {translate("deleted", { ns: "common" })}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TanstackTable;
