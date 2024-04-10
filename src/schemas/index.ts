import { Logradouro } from "@/enums/Logradouro";
import * as z from "zod";

const NUMBER = "Valor deve ser um número.";
const POSITIVE = "Valor deve ser maior ou igual a 0.";
const GREATER_THAN_0 = "Valor deve ser maior que 0.";
const CANNOT_BE_EMPTY = "Campo obrigatório.";
const INVALID_DATE = "Data inválida.";
const INVALID_EMAIL = "Email inválido.";
const INVALID_PASSWORD = "Senha inválida.";

export const LoginSchema = z.object({
  email: z.string().email(INVALID_EMAIL),
  password: z.string().min(1, INVALID_PASSWORD),
});

export const ObraModalSchema = z.object({
  cod_obra: z
    .string()
    .min(8, "Deve conter apenas 8 caracteres")
    .max(8, "Deve conter apenas 8 caracteres"),
  num_obra: z.coerce.number().int().min(1, GREATER_THAN_0).max(999),
  ano: z.coerce.number().int().positive().min(1980),
  data_inicio: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? INVALID_DATE : defaultError,
    }),
  }),
  data_fim: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? INVALID_DATE : defaultError,
    }),
  }),
  uf: z.string().min(2).max(2),
  cidade: z.string().max(40),
  tipo_logo: z.nativeEnum(Logradouro),
  logradouro: z.string().min(1, CANNOT_BE_EMPTY).max(100),
  complemento_logo: z.string().max(30),
  bairro: z.string().min(1, CANNOT_BE_EMPTY).max(40),
  lote: z.string().max(40),
  quadra: z.string().max(40),
  proprietario: z.string().max(60),
  cliente: z.string().min(1, CANNOT_BE_EMPTY).max(120),
  sondagem_percussao: z.optional(
    z.object({
      furos: z.number().int().min(1, GREATER_THAN_0),
      metros: z.number().min(0, POSITIVE),
    })
  ),
  sondagem_trado: z.optional(
    z.object({
      furos: z.number().int().min(1, GREATER_THAN_0),
      metros: z.number().min(0, POSITIVE),
    })
  ),
  sondagem_rotativa: z.optional(
    z.object({
      furos: z.number().int().min(1, GREATER_THAN_0),
      metros_solo: z.number().min(0, POSITIVE),
      metros_rocha: z.number().min(0, POSITIVE),
    })
  ),
});

export const SearchSchema = z.string().min(1).max(100);

export const UserModalSchema = z
  .object({
    name: z.string().min(1, CANNOT_BE_EMPTY).max(30),
    email: z.string().email(INVALID_EMAIL).max(40),
    password: z
      .string()
      .min(6, "Deve possuir no mínimo 6 caracteres.")
      .max(100),
    confirmPassword: z
      .string()
      .min(6, "Deve possuir no mínimo 6 caracteres.")
      .max(100),
    isAdmin: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const UserEditModalSchema = z.object({
  name: z.string().min(1, CANNOT_BE_EMPTY).max(30),
  email: z.string().email(INVALID_EMAIL).max(40),
  isAdmin: z.boolean(),
});

export const ResetPasswordModalSchema = z
  .object({
    password: z
      .string()
      .min(6, "Deve possuir no mínimo 6 caracteres.")
      .max(100),
    confirmPassword: z
      .string()
      .min(6, "Deve possuir no mínimo 6 caracteres.")
      .max(100),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });
