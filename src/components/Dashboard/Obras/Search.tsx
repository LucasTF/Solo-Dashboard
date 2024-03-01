"use client";

import { TableStructure } from "@/types/TableStructure";
import { BaseSearch } from "@/components/Dashboard/BaseSearch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ObrasSearchFiltersSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEntryStore } from "@/lib/stores/entry";
import { useState } from "react";

type SearchBaseProps = {
  tableStructure: TableStructure;
};

export const ObrasSearch = ({ tableStructure }: SearchBaseProps) => {
  const router = useRouter();

  const [advancedFilters, toggleAdvancedFilters] = useState(false);

  const { clearEntry } = useEntryStore();

  const { register, handleSubmit } = useForm<
    z.infer<typeof ObrasSearchFiltersSchema>
  >({
    resolver: zodResolver(ObrasSearchFiltersSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchHandler = (searchString: string, column: string) => {
    clearEntry();
    const newUrl =
      tableStructure.table +
      "?" +
      new URLSearchParams(`search=${searchString}&column=${column}`);
    router.push(newUrl);
  };

  return (
    <section className="flex flex-col grow gap-4">
      <BaseSearch
        tableStructure={tableStructure}
        register={register}
        onSubmit={handleSubmit((onValid) =>
          searchHandler(onValid.search, onValid.column)
        )}
        onAdvancedFilterClick={() => toggleAdvancedFilters((state) => !state)}
        advancedFilterState={advancedFilters}
      />
      {advancedFilters && (
        <div>
          <p>Filtros a serem adicionados.</p>
        </div>
      )}
    </section>
  );
};