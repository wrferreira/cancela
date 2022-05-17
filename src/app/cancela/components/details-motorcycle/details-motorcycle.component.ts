import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { SignalRService } from 'src/app/shared/services/signalR.service';

import { VeiculoSituacao } from 'src/app/shared/enum/veiculo-situacao.enum';
import { CancelaLastRegister } from '../../models/cancela-last-register';
import { CancelaResponseEvent } from '../../models/cancela-response-event';
import { CancelaUserPhotos } from '../../models/cancela-images';

const PHOTOS_LIST = ['assinatura', 'usuarioCnh'];

@Component({
  selector: 'app-details-motorcycle',
  templateUrl: './details-motorcycle.component.html',
  styleUrls: ['./details-motorcycle.component.scss'],
})
export class DetailsMotorcycleComponent implements OnInit {
  @Input() onlyPlate: boolean = false;
  @Input() dataVehicle!: CancelaLastRegister;
  veiculoSituacao = VeiculoSituacao;
  cancelaResponseEvt!: CancelaResponseEvent;
  listaFotos: CancelaUserPhotos[] = [];
  url: string = 'https://prod-backendop.mottu.dev/s3/download/mottu-usuario/';

  constructor(
    private cd: ChangeDetectorRef,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    console.log(this.dataVehicle);
    this.cancelaResponseEvt = this.signalRService.cancelaResponse;

    this.setImageList();
  }

  setImageList() {
    this.listaFotos.push({
      url: `${this.url}${this.dataVehicle['assinatura']}`,
      title: 'assinatura',
    });
    this.listaFotos.push({
      url: `${this.url}${this.dataVehicle['usuarioCnh']}`,
      title: 'usuarioCnh',
    });
    console.log(this.listaFotos);
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
}
