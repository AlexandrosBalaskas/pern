import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
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

const TanstackTable = ({ pageId, columns, filtering, rowButtons }: any) => {
  const arr: any = [];
  const [isCall, setIsCall] = useState(false);
  const [sorting, setSorting] = useState(arr);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState(arr);

  const { t: translate } = useTranslation("common");
  const parentId = "Tanstack";

  const { criteria, loadTable, initTable, data, count } = useTable(pageId);
  console.log(data, "data");

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
    loadTable({
      params: {
        ...sort,
        ...finalPagination,
        filters: JSON.stringify(criteria),
      },
      tableId: pageId,
      pageId,
    });
  }, [sort, finalPagination, criteria, isCall]);

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
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleFilters = useCallback(() => {
    open ? closeDrawer() : openDrawer();
  }, [open, openDrawer, closeDrawer]);

  const onCall = () => {
    setIsCall(!isCall);
  };

  return (
    <>
      <FiltersContainer
        pageId={pageId}
        parentId={parentId}
        filtering={filtering}
        onClose={toggleFilters}
      />
      <TableContainer component={Paper}>
        <AppIconButton
          id={"Tanstack-filter-btn"}
          label={translate("filter")}
          onClick={toggleFilters}
          icon={
            <Assets
              input="icons"
              name="Search"
              props={{ className: "primary" }}
            />
          }
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: (theme) => theme.palette.grey[100],
                        },
                      }}
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                        nothing: "",
                      }[header.column.getIsSorted() || "nothing"] ?? null}
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
                      onCall={onCall}
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
    </>
  );
};

export default TanstackTable;
