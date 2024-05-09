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
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";
import MenuActionButton from "../ActionButtons/MenuButton";
import FiltersContainer from "../Filters/FiltersContainer";
import { TanstackTablePagination } from "./TanstackTablePagination";
import api from "../../axiosConfig";

const TanstackTable = ({ pageId, columns, filtering, rowButtons }: any) => {
  const arr: any = [];
  const [isCall, setIsCall] = useState(false);
  const [data, setData] = useState(arr);
  const [sorting, setSorting] = useState(arr);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState(arr);

  const parentId = "Tanstack";

  const { groups } = rowButtons;

  const finalActions = useMemo(() => {
    return groups;
  }, [groups]);

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
    api({
      method: "get", //you can set what request you want to be
      url: "/accounts",
      params: { filters: "" },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      setData(response?.data?.data);
      return response;
    });
  }, []);

  const table = useReactTable({
    data,
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
    pageCount: 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleFilters = () => {};

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
          label={"filter"}
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
                        "&:hover": {},
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
          count={0}
          pagination={pagination}
          pageId={pageId}
        />
      </TableContainer>
    </>
  );
};

export default TanstackTable;
