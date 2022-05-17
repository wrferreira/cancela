export interface CancelaResponseEvent {
  cancelaLiberada: boolean;
  clienteNome: string;
  erros: string[];
  id: number;
  leituraBruta: string | null;
  placa: string;
  placaUrl: string | null;
  veiculoId: number;
  veiculoSituacao: number;
}
