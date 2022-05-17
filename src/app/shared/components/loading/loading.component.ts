import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  waiting!: boolean;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.waiting = true;
    }, 1500);
  }
}
