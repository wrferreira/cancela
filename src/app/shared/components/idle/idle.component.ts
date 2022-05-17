import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  @HostListener('document:keydown', ['$event'])
  handleKeyBoardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.code == 'Space') {
      this.router.navigate(['/cancela/servico']);
    }
  }
}
