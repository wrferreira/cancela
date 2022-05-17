import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchChange = new EventEmitter();
  @Output() btnClicked = new EventEmitter();
  plateFormControl = new FormControl('');
  searchedPlate: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.plateFormControl.valueChanges.subscribe((value) => {
      this.searchChange.emit(value);
      if (/\W|_/.test(value)) {
        this.plateFormControl.setValue(value.substring(0, value.length - 1));
      }
    });
  }

  configurePlate(): string {
    if (this.plateFormControl.value.length == 7) {
      const endPlate = this.plateFormControl.value.slice(
        3,
        this.plateFormControl.value.length
      );
      const initialPlate = this.plateFormControl.value.slice(0, 3);
      this.searchedPlate = `${initialPlate}-${endPlate}`;
    }
    return this.searchedPlate.toUpperCase();
  }

  btnSearchClick() {
    this.configurePlate();
    this.btnClicked.emit(this.searchedPlate);
  }

  // valid() {
  //   const plate = /[A-Za-z]{3}[0-9][A-Za-z0-9][0-9]{2}/;
  //   if (
  //     (plate.test(this.plateFormControl.value) &&
  //       this.plateFormControl.value.length == 7) ||
  //     this.plateFormControl.value.length == 17
  //   ) {
  //     this.error = '';
  //   } else
  //     this.error =
  //       this.plateFormControl.value.length >= 8
  //         ? 'Chassi inválido'
  //         : 'Placa inválida';
  // }

  validaBtn() {
    return (
      this.errorMessage !== '' ||
      this.plateFormControl.value == '' ||
      this.plateFormControl.value.length < 7
    );
  }

  reset() {
    this.plateFormControl.setValue('');
  }
}
