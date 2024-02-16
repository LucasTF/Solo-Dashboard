import { TableStructure, TablesEnum } from "../TableStructure";

export const obrasStructure: TableStructure = {
  columnNames: [
    "ID",
    "Cod SP",
    "Ano",
    "Tipo Logradouro",
    "Logradouro",
    "Bairro",
    "Cidade",
    "UF",
    "Cliente",
    "Proprietário",
  ],
  searchColumns: [
    { name: "Cod SP", value: "nome" },
    { name: "Bairro", value: "bairro" },
    { name: "Cidade", value: "cidade" },
    { name: "Cliente", value: "cliente" },
    { name: "Proprietário", value: "proprietario" },
  ],
  type: TablesEnum.Obras,
};