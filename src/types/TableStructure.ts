import { Tables } from "@/enums/Tables";

export type Column = {
  name: string;
  value: string;
  searchable: boolean;
};

export type TableStructure = {
  table: Tables;
  columns: Column[];
};
