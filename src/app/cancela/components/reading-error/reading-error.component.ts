import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseRequestResult } from 'src/app/core/models/base-request.model';
import { SignalRService } from 'src/app/shared/services/signalR.service';
import { CancelaData } from '../../models/cancela-data.model';
import { CancelaLastRegister } from '../../models/cancela-last-register';
import { CancelaRegistroManual } from '../../models/cancela-registro-manual';
import { CancelaRouteParams } from '../../models/cancela-route-params';
import { CancelaDataService } from '../../services/cancela-data.service';
import { CancelaService } from '../../services/cancela.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reading-error',
  templateUrl: './reading-error.component.html',
  styleUrls: ['./reading-error.component.scss'],
})
export class ReadingErrorComponent implements OnInit {
  templatePlaca: boolean = true;
  dataRegister = new CancelaRegistroManual();
  dataCancela!: CancelaData;
  plateSearch!: string;
  subscription = new Subscription();

  constructor(
    private signalRService: SignalRService,
    private cancelaService: CancelaService,
    private cancelaDataService: CancelaDataService,
    private router: Router
  ) {
    this.dataCancela = this.signalRService.dataCancela;
    this.dataCancelaMock();
  }

  dataCancelaMock() {
    if (!this.dataCancela) {
      this.dataCancela = { cancelaId: 3, tipo: 25, sentido: 10 };
    }
  }

  ngOnInit(): void {}

  plateChange(event: any) {
    this.templatePlaca = event?.length <= 7;
    this.plateSearch = event;
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
}
