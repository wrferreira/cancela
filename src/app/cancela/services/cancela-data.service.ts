import { Injectable } from '@angular/core';

import { CancelaLastRegister } from '../models/cancela-last-register';

@Injectable({
  providedIn: 'root',
})
export class CancelaDataService {
  vehicle!: CancelaLastRegister;

  constructor() {}

  setDataVehicle(vehicle: CancelaLastRegister) {
    this.vehicle = vehicle;
  }

  get dataVehicle() {
    return this.vehicle;
  }

  get currentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) return JSON.parse(currentUser);
  }
}
