"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ObraModalSchema } from "@/schemas";
import { SearchFilters } from "@/types/SearchFilters";
import { Obra } from "@/types/data/Obra";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { ServerResponse } from "@/types/ServerResponse";
import {
  getObraByIdLegacy,
  getTableObrasLegacy,
  insertNewObraLegacy,
  searchObrasLegacy,
  updateObraLegacy,
} from "./legacy/obras";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

export async function getTableObras() {
  try {
    if (isLegacy) return await getTableObrasLegacy();

    const obras: Obra[] = await db.obra.findMany({
      select: {
        id: true,
        sp: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: true,
        proprietario: true,
      },
    });

    return obras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getObraById(id: number) {
  try {
    if (isLegacy) return await getObraByIdLegacy(id);

    const obra = await db.obra.findUnique({
      where: { id },
      include: {
        arquivos: true,
      },
    });

    return obra;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchObras(searchFilters: SearchFilters) {
  try {
    if (isLegacy) return await searchObrasLegacy(searchFilters);

    const obras: Obra[] = await db.obra.findMany({
      select: {
        id: true,
        sp: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: true,
        proprietario: true,
      },
      where: {
        [searchFilters.column]: {
          contains: searchFilters.search,
        },
      },
      orderBy: {
        sp: "desc",
      },
    });

    return obras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type ObraData = z.infer<typeof ObraModalSchema>;

export async function updateObra(
  id: number,
  obra: ObraData
): Promise<ServerResponse> {
  const adminToken = cookies().get("adminJwt");

  if (!adminToken)
    return { success: false, error: "Autorização insuficiente." };
  const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;
  if (!isValidAdmin)
    return { success: false, error: "Autorização insuficiente." };

  try {
    if (isLegacy) return await updateObraLegacy(id, obra);

    const data = {
      sp: obra.sp,
      num_obra: obra.num_obra,
      sp_sondagem: obra.sp_sondagem,
      metros_sp_sondagem: obra.metros_sp_sondagem,
      STTrado: obra.STTrado,
      STTradoml: obra.STTradoml,
      data_inicio: formatYYYYMMDD(obra.data_inicio),
      data_fim: formatYYYYMMDD(obra.data_fim),
      ano: obra.ano,
      tipo_logo: obra.tipo_logo,
      cidade: obra.cidade,
      uf: obra.uf,
      logradouro: obra.logradouro,
      complemento_logo: obra.complemento,
      bairro: obra.bairro,
      lote: obra.lote,
      quadra: obra.quadra,
      cliente: obra.cliente,
      proprietario: obra.proprietario,
    };

    await db.obra.update({
      data,
      where: {
        id,
      },
    });

    return { success: true, message: "Obra atualizada com sucesso." };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar a obra." };
  }
}

export async function insertNewObra(obra: ObraData): Promise<ServerResponse> {
  try {
    if (isLegacy) return await insertNewObraLegacy(obra);

    const data = {
      sp: obra.sp,
      num_obra: obra.num_obra,
      sp_sondagem: obra.sp_sondagem,
      metros_sp_sondagem: obra.metros_sp_sondagem,
      STTrado: obra.STTrado,
      STTradoml: obra.STTradoml,
      data_inicio: formatYYYYMMDD(obra.data_inicio),
      data_fim: formatYYYYMMDD(obra.data_fim),
      ano: obra.ano,
      tipo_logo: obra.tipo_logo,
      cidade: obra.cidade,
      uf: obra.uf,
      logradouro: obra.logradouro,
      complemento_logo: obra.complemento,
      bairro: obra.bairro,
      lote: obra.lote,
      quadra: obra.quadra,
      cliente: obra.cliente,
      proprietario: obra.proprietario,
    };

    await db.obra.create({
      data,
    });

    return { success: true, message: "Obra criada com sucesso!" };
  } catch (error) {
    return { success: false, error: "Erro ao criar a obra." };
  }
}
