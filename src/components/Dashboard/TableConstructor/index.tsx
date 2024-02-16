import { getTableData } from "@/lib/actions/data";
import { DashboardTable } from "../Table";
import { TablesEnum } from "@/lib/structures/TableStructure";
import { SearchFilter } from "@/schemas";
import React from "react";

type TableConstructorProps = {
  columnNames: string[];
  searchFilter: SearchFilter;
  tableType: TablesEnum;
};

export const TableConstructor = async ({
  columnNames,
  searchFilter,
  tableType,
}: TableConstructorProps) => {
  const data = await getTableData(tableType, searchFilter);

  return (
    <DashboardTable
      columnNames={columnNames}
      data={{ type: tableType, entries: data }}
    />
  );
};