import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { SignalRService } from 'src/app/shared/services/signalR.service';
import { CancelaDataService } from 'src/app/cancela/services/cancela-data.service';
import { CancelaService } from 'src/app/cancela/services/cancela.services';

import { CancelaRegistroManual } from 'src/app/cancela/models/cancela-registro-manual';
import { CancelaLastRegister } from 'src/app/cancela/models/cancela-last-register';
import { BaseRequestResult } from 'src/app/core/models/base-request.model';
import { CancelaOptions } from 'src/app/cancela/models/cancela-options';
import { CancelaData } from 'src/app/cancela/models/cancela-data.model';
import { MatStepper } from '@angular/material/stepper';
import { CancelaSentidoEnum } from 'src/app/shared/enum/cancela-sentido.enum';
import { CancelaRouteParams } from 'src/app/cancela/models/cancela-route-params';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manual-options',
  templateUrl: './manual-options.component.html',
  styleUrls: ['./manual-options.component.scss'],
})
export class ManualOptionsComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  dataRegister = new CancelaRegistroManual();
  dataCancela!: CancelaData;
  plateFormControl = new FormControl('');
  dataVehicle!: CancelaLastRegister;
  optionList = OPCOES_CANCELA;
  optionsCancela: CancelaOptions[] = [];
  directionSelected!: number;
  optionSelected!: number | null;
  directionLabel!: string | null;
  showDetails: boolean = false;
  cancelaSentido = CancelaSentidoEnum;
  subscription = new Subscription();

  templatePlaca: boolean = true;
  plateSearch!: string;

  constructor(
    private signalRService: SignalRService,
    private cancelaService: CancelaService,
    private cancelaDataService: CancelaDataService,
    private router: Router
  ) {
    this.dataCancela = this.signalRService.dataCancela;
    this.dataCancelaMock();
  }

  ngOnInit(): void {}

  dataCancelaMock() {
    if (!this.dataCancela) {
      this.dataCancela = { cancelaId: 3, tipo: 25, sentido: 10 };
    }
  }

  onDirectionSelected() {
    this.optionsCancela = this.optionList.filter(
      (opt) => opt.direcao == this.directionSelected
    );
    this.optionSelected = null;
    this.goStepForward();
    this.setDirectionLabel();
  }

  onOptionSelected() {
    this.goStepForward();
  }

  setDirectionLabel() {
    this.directionLabel =
      this.directionSelected == this.cancelaSentido.Entrada
        ? 'da entrada'
        : this.directionSelected == this.cancelaSentido.Saida
        ? 'da saída'
        : '';
  }

  searchClick(event: string) {
    if (event) {
      event.length == 8
        ? (this.dataRegister.placa = event.toLocaleUpperCase())
        : (this.dataRegister.chassi = event.toLocaleUpperCase());
      this.dataRegister.cancelaId = this.dataCancela.cancelaId;
      this.dataRegister.sentido = this.dataCancela.sentido;
      this.dataRegister.tipo = this.dataCancela.tipo;

      this.sendManualRegister();
    }
  }

  sendManualRegister() {
    this.subscription.add(
      this.cancelaService
        .setManualRegister(this.dataRegister)
        .subscribe((response: BaseRequestResult<CancelaLastRegister>) => {
          if (response.dataResult) {
            this.cancelaDataService.setDataVehicle(response.dataResult);
            this.redirect(response.dataResult);
          }
        })
    );
  }

  redirect(data: CancelaRouteParams) {
    this.router.navigate(['/cancela/successful'], {
      queryParams: {
        veiculoId: data.veiculoId,
        cancelaLiberada: data.cancelaLiberada,
      },
    });
  }

  plateChange(event: any) {
    this.templatePlaca = event?.length <= 7;
    this.plateSearch = event;
  }

  goStepForward() {
    this.stepper.next();
  }
}

const OPCOES_CANCELA: CancelaOptions[] = [
  { id: 0, direcao: 20, descricao: 'Lavagem' },
  { id: 1, direcao: 20, descricao: 'Suporte de rua' },
  { id: 2, direcao: 10, descricao: 'Suporte de rua' },
  { id: 3, direcao: 20, descricao: 'Dar baixa de B.O' },
  { id: 4, direcao: 10, descricao: 'Dar baixa de B.O' },
  { id: 5, direcao: 10, descricao: 'Uso administrativo' },
  { id: 6, direcao: 10, descricao: 'Uso administrativo' },
  { id: 7, direcao: 20, descricao: 'Entrega para cliente' },
  { id: 8, direcao: 10, descricao: 'Realizar manutenção' },
  { id: 9, direcao: 20, descricao: 'Distribuição' },
];
