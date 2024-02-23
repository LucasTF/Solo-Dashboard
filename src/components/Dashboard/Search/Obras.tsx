"use client";

import { SearchColumn, TablesEnum } from "@/lib/structures/TableStructure";
import { SearchBase } from "./Base";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ObrasSearchFiltersSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEntryStore } from "@/lib/stores/entry";
import { useState } from "react";

type SearchBaseProps = {
  searchColumns: SearchColumn[];
  table: TablesEnum;
};

export const ObrasSearch = ({ searchColumns, table }: SearchBaseProps) => {
  const router = useRouter();

  const [advancedFilters, toggleAdvancedFilters] = useState(false);

  const { resetEntry } = useEntryStore();

  const { register, handleSubmit } = useForm<
    z.infer<typeof ObrasSearchFiltersSchema>
  >({
    resolver: zodResolver(ObrasSearchFiltersSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchHandler = (searchString: string, column: string) => {
    resetEntry();
    const newUrl =
      table +
      "?" +
      new URLSearchParams(`search=${searchString}&column=${column}`);
    router.push(newUrl);
  };

  return (
    <div className="flex flex-col grow gap-4">
      <SearchBase
        searchColumns={searchColumns}
        register={register}
        onSubmit={handleSubmit((onValid) =>
          searchHandler(onValid.search, onValid.column)
        )}
        onAdvancedFilterClick={() => toggleAdvancedFilters((state) => !state)}
        advancedFilterState={advancedFilters}
      />
      {advancedFilters && (
        <div className="h-56">
          <p>Filtros a serem adicionados.</p>
        </div>
      )}
    </div>
  );
};