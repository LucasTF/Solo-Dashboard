import { Obra } from "@/types/obraType";

export type LegacyDbObra = {
  codobra: number;
  codprop?: string;
  nomeobra?: string;
  numobra?: number;
  anoobra?: number;
  datainiobra?: string;
  datafimobra?: string;
  tipologobra?: string;
  logradouroobra?: string;
  loteobra?: string;
  quadraobra?: string;
  numlogobra?: string;
  bairroobra?: string;
  cidadeobra?: string;
  ufobra?: string;
  cepobra?: string;
  complelogobra?: string;
  SPSondagem?: number;
  MetrosSPSondagem?: number;
  SRSondagem?: string;
  MetrosSRSolo?: string;
  MetrosSRRocha?: string;
  RBPonteiras?: string;
  RBEquipamentos?: string;
  RBDataInicial?: string;
  RBDataTermino?: string;
  TITirantes?: string;
  TipoTirantes?: string;
  CargaTirantes?: string;
  MicroEstaca1?: string;
  MicroEstaca2?: string;
  MicroEstaca3?: string;
  TBTubulao?: string;
  TBCotaApoio?: string;
  TBCotaApoioA?: string;
  TBTaxaSolo?: string;
  STTrado?: number;
  STTradoml?: number;
  proprietario?: string;
  cliente?: string;
};

export function adaptToObra(obra: LegacyDbObra): Obra | {} {
  if (obra === null) return {};

  return {
    id: obra.codobra,
    cod_prop: obra.codprop,
    nome: obra.nomeobra,
    num_obra: obra.numobra,
    ano: obra.anoobra,
    data_inicio: obra.datainiobra,
    data_fim: obra.datafimobra,
    tipo_logo: obra.tipologobra,
    logradouro: obra.logradouroobra,
    lote: obra.loteobra,
    quadra: obra.quadraobra,
    num_logo: obra.numlogobra,
    bairro: obra.bairroobra,
    cidade: obra.cidadeobra,
    uf: obra.ufobra,
    cep: obra.cepobra,
    complemento_logo: obra.complelogobra,
    sp_sondagem: obra.SPSondagem,
    metros_sp_sondagem: obra.MetrosSPSondagem,
    sr_sondagem: obra.SRSondagem,
    metros_sr_solo: obra.MetrosSRSolo,
    metros_sr_rocha: obra.MetrosSRRocha,
    rb_ponteiras: obra.RBPonteiras,
    rb_equipamentos: obra.RBEquipamentos,
    rb_data_inicial: obra.RBDataInicial,
    rb_data_termino: obra.RBDataTermino,
    TITirantes: obra.TITirantes,
    tipo_tirantes: obra.TipoTirantes,
    carga_tirantes: obra.CargaTirantes,
    micro_estaca_1: obra.MicroEstaca1,
    micro_estaca_2: obra.MicroEstaca2,
    micro_estaca_3: obra.MicroEstaca3,
    tb_tubulao: obra.TBTubulao,
    tb_cota_apoio: obra.TBCotaApoio,
    tb_cota_apoio_A: obra.TBCotaApoioA,
    tb_taxa_solo: obra.TBTaxaSolo,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    proprietario: obra.proprietario,
    cliente: obra.cliente,
  };
}

export function adaptFromObra(obra: Obra): LegacyDbObra {
  return {
    codobra: obra.id,
    codprop: obra.cod_prop,
    nomeobra: obra.nome,
    numobra: obra.num_obra,
    anoobra: obra.ano,
    datainiobra: obra.data_inicio,
    datafimobra: obra.data_fim,
    tipologobra: obra.tipo_logo,
    logradouroobra: obra.logradouro,
    loteobra: obra.lote,
    quadraobra: obra.quadra,
    numlogobra: obra.num_logo,
    bairroobra: obra.bairro,
    cidadeobra: obra.cidade,
    ufobra: obra.uf,
    cepobra: obra.cep,
    complelogobra: obra.complemento_logo,
    SPSondagem: obra.sp_sondagem,
    MetrosSPSondagem: obra.metros_sp_sondagem,
    SRSondagem: obra.sr_sondagem,
    MetrosSRSolo: obra.metros_sr_solo,
    MetrosSRRocha: obra.metros_sr_rocha,
    RBPonteiras: obra.rb_ponteiras,
    RBEquipamentos: obra.rb_equipamentos,
    RBDataInicial: obra.rb_data_inicial,
    RBDataTermino: obra.rb_data_termino,
    TITirantes: obra.TITirantes,
    TipoTirantes: obra.tipo_tirantes,
    CargaTirantes: obra.carga_tirantes,
    MicroEstaca1: obra.micro_estaca_1,
    MicroEstaca2: obra.micro_estaca_2,
    MicroEstaca3: obra.micro_estaca_3,
    TBTubulao: obra.tb_tubulao,
    TBCotaApoio: obra.tb_cota_apoio,
    TBCotaApoioA: obra.tb_cota_apoio_A,
    TBTaxaSolo: obra.tb_taxa_solo,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    proprietario: obra.proprietario,
    cliente: obra.cliente,
  };
}
