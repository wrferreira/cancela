export interface BaseRequestResult<T> {
  dataResult: T;
  erro: boolean;
  menssagemErro: string;
}
