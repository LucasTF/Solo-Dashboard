"use server";

import { db } from "@/lib/db";
import { DataResponse } from "@/types/ServerResponse";

export type LatestFile = {
  fileName: string;
  obra: string;
  ano: number;
  createdAt: Date;
};

type YearlyObras = {
  ano: number;
  total: string;
};

type HomeData = {
  totalObras: number;
  totalFiles: number;
  latestFiles: LatestFile[];
  obrasPerYear: YearlyObras[];
};

export async function getHomeData(): Promise<DataResponse<HomeData>> {
  try {
    let totalObrasQuery, totalFilesQuery, latestFilesQuery, obrasPerYearQuery;

    totalObrasQuery = db.obra.count();
    totalFilesQuery = db.arquivo.count();
    latestFilesQuery = db.$queryRaw`SELECT ar.nome as fileName, ob.cod_obra as obra, ob.ano as ano, ar.criado_em as createdAt FROM Arquivo as ar INNER JOIN Obra as ob ON ar.obraId=ob.id ORDER BY ar.criado_em DESC LIMIT 5;`;
    obrasPerYearQuery = db.$queryRaw`SELECT ob.ano as 'ano', CAST(COUNT(ob.ano) AS CHAR CHARACTER SET utf8) as 'total' FROM Obra as ob WHERE ob.ano >= ${
      new Date().getFullYear() - 10
    } GROUP BY ob.ano;`;

    const [totalObras, totalFiles, latestFiles, obrasPerYear] =
      await Promise.all([
        totalObrasQuery,
        totalFilesQuery,
        latestFilesQuery,
        obrasPerYearQuery,
      ]);

    return {
      success: true,
      data: {
        totalObras,
        totalFiles,
        latestFiles: latestFiles as LatestFile[],
        obrasPerYear: obrasPerYear as YearlyObras[],
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao recuperar dados." };
  }
}
