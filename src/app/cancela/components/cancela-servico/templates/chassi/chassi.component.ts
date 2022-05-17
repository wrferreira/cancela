import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chassi',
  templateUrl: './chassi.component.html',
  styleUrls: ['./chassi.component.scss'],
})
export class ChassiComponent implements OnInit {
  @Input() plate!: String;
  constructor() {}

  ngOnInit(): void {}
}
