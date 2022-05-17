import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { CancelaData } from 'src/app/cancela/models/cancela-data.model';
import { CancelaResponseEvent } from 'src/app/cancela/models/cancela-response-event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private baseUrl = environment.signalR;
  private hubConnectionMonitor!: HubConnection;
  private cancelaData!: CancelaData;
  private sentidoCancela!: number;
  private cancelaResponseEvt!: CancelaResponseEvent;

  get dadosCancela() {
    return this.cancelaData;
  }
  get cancelaSentido() {
    return this.sentidoCancela;
  }
  get cancelaResponse() {
    return this.cancelaResponseEvt;
  }
  get dataCancela() {
    const dataCancela = localStorage.getItem('dataCancela');
    if (dataCancela) return JSON.parse(dataCancela);
  }

  constructor(private router: Router) {}

  connect() {
    let builder = new HubConnectionBuilder();
    this.hubConnectionMonitor = builder.withUrl(this.baseUrl).build();
    this.hubConnectionMonitor.start();

    this.hubConnectionMonitor.on('DadosCancela', (param: CancelaData) => {
      console.log('DadosCancela', param);
      this.cancelaData = param;
      localStorage.setItem('dataCancela', JSON.stringify(param));
    });

    this.hubConnectionMonitor.on('SensorAtuado', (param: number) => {
      console.log(param);
      this.sentidoCancela = param;
      this.dadosCancela.tipo >= 20 //AJUSTAR ENUM
        ? this.redirect('servico')
        : this.redirect('loading');
    });

    this.hubConnectionMonitor.on('RequestEvent', (param: boolean) => {
      console.log('RequestEvent', param);
    });

    this.hubConnectionMonitor.on(
      'ResponseEvent',
      (param: CancelaResponseEvent) => {
        console.log('ResponseEvent', param);
        this.cancelaResponseEvt = param;
        param.erros?.filter(
          (e) => e == 'ERRO DE LEITURA! TENTE NOVAMENTE OU DIGITE A PLACA'
        ).length
          ? this.redirect('readingerror')
          : this.redirect('successful');
      }
    );

    this.hubConnectionMonitor.on('CancelaFechada', (param: any) => {
      console.log('CancelaFechada', param);
      this.redirect('');
    });
  }

  redirect(route: string) {
    this.router.navigate([`/cancela/${route}`]);
  }

  abrirCancela() {
    this.hubConnectionMonitor
      .send('AbreCancela')
      .then((result) => console.log('AbreCancela: ', result));
  }

  operacaoManual() {
    this.hubConnectionMonitor
      .send('ModoManual')
      .then((result) => console.log('ModoManual: ', result));
  }

  disconnect() {
    if (this.hubConnectionMonitor) this.hubConnectionMonitor.stop();
  }
}
