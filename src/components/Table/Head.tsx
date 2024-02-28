import { Column } from "@/lib/structures/TableStructure";

type HeadProps = {
  columns: Column[];
};

export const Head = ({ columns }: HeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.name}
            className="px-4 py-2 text-xs font-medium text-gray-500 uppercase sticky top-0 bg-slate-200"
            scope="col"
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};
