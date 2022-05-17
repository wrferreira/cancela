import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit, OnChanges {
  @Input() plate!: string;
  public initialPlate!: string;
  public endPlate!: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges | any): void {
    if (changes.plate) {
      this.endPlate = this.plate?.slice(3, this.plate?.length);
      this.initialPlate = this.plate?.slice(0, 3);
    }
  }

  ngOnInit(): void {}
}
