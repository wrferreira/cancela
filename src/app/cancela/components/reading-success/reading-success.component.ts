import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CancelaService } from '../../services/cancela.services';
import { SignalRService } from 'src/app/shared/services/signalR.service';

import { CancelaData } from '../../models/cancela-data.model';
import { CancelaRouteParams } from './../../models/cancela-route-params';
import { CancelaLastRegister } from '../../models/cancela-last-register';
import { CancelaResponseEventInfo } from '../../models/cancela-response-info';
import { CancelaResponseEvent } from '../../models/cancela-response-event';
import { BaseRequestResult } from 'src/app/core/models/base-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reading-success',
  templateUrl: './reading-success.component.html',
  styleUrls: ['./reading-success.component.scss'],
})
export class ReadingSuccessComponent implements OnInit, OnDestroy {
  dataVehicle!: CancelaLastRegister;
  dadosCancela: CancelaData;
  infoConsulta!: CancelaResponseEventInfo;
  cancelaResponseEvt!: CancelaResponseEvent;
  subscription = new Subscription();
  routeParam!: CancelaRouteParams;
  spinner: boolean = false;

  constructor(
    private cancelaService: CancelaService,
    private signalRService: SignalRService,
    private activateRoute: ActivatedRoute
  ) {
    this.dadosCancela = this.signalRService.dataCancela;
    this.cancelaResponseEvt = this.signalRService.cancelaResponse;
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      this.routeParam = params.veiculoId ? params : false;
      this.loadMockData();
      this.getLastRegisterData();
    });
  }

  loadMockData() {
    if (!this.dadosCancela) {
      this.dadosCancela = { cancelaId: 3, tipo: 25, sentido: 10 };
      // this.cancelaResponseEvt = EVT;
      // this.dataVehicle = DATA_VEHICLE;
      // this.infoConsulta = EVT.cancelaLiberada
      //   ? RESPONSE_SUCCESS
      //   : RESPONSE_FAIL;
      // this.infoConsulta.listaErros = this.dataVehicle.erros;
    }
  }

  getLastRegisterData() {
    this.subscription.add(
      this.cancelaService
        .getLastRegister(this.dadosCancela)
        .subscribe((response: BaseRequestResult<CancelaLastRegister>) => {
          this.dataVehicle = response.dataResult;
          this.spinner = true;
          this.loadDataVehicle();
        })
    );
  }

  loadDataVehicle() {
    const cancelaLiberada = this.routeParam
      ? this.routeParam.cancelaLiberada == 'true'
      : this.cancelaResponseEvt?.cancelaLiberada;

    this.infoConsulta = cancelaLiberada ? RESPONSE_SUCCESS : RESPONSE_FAIL;
    this.infoConsulta.listaErros = this.dataVehicle.erros;

    cancelaLiberada ? this.signalRService.abrirCancela() : false;
  }

  getErrorList() {
    return (
      this.infoConsulta?.listaErros.length &&
      this.infoConsulta?.listaErros[0] != ''
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

const RESPONSE_SUCCESS: CancelaResponseEventInfo = {
  icon: 'check_circle_outline',
  title: 'Tudo certo!',
  message: 'Cancela liberada',
  listaErros: [],
  status: true,
};
const RESPONSE_FAIL: CancelaResponseEventInfo = {
  icon: 'error_outline',
  title: 'Erro de validação!',
  message: 'Não foi possível liberar a cancela',
  listaErros: [],
  status: false,
};

// const EVT: CancelaResponseEvent = {
//   cancelaLiberada: true,
//   clienteNome: 'Marcelo Augusto da Silva',
//   erros: ['Não foi feito o checklist', 'Não foi feita a Manutenção'],
//   id: 123,
//   leituraBruta: null,
//   placa: 'EVT-1H33',
//   placaUrl: null,
//   veiculoId: 111,
//   veiculoSituacao: 200,
// };
// const DATA_VEHICLE: CancelaLastRegister = {
//   assinatura: '',
//   cancelaId: 123,
//   cancelaLiberada: true,
//   chassi: '1231254365342342',
//   clienteId: 3334,
//   clienteNome: 'Marcelo Augusto',
//   erros: ['O veículos possui pendencias de checklis'],
//   id: 2321,
//   leituraBruta: '',
//   placa: 'CFE-3H22',
//   placaUrl: '',
//   sentido: 10,
//   tipo: 25,
//   usuarioCnh: '',
//   veiculoId: 32334,
//   veiculoSituacao: 1500,
// };
