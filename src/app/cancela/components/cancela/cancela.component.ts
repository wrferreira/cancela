import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/access/services/auth.service';

@Component({
  selector: 'app-cancela',
  templateUrl: './cancela.component.html',
  styleUrls: ['./cancela.component.scss'],
})
export class CancelaComponent implements OnInit {
  displayHeader: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  activatedRoute(event: ActivatedRoute) {
    this.displayHeader =
      event.constructor.name != 'IdleComponent' &&
      event.constructor.name != 'LoadingComponent'
        ? true
        : false;
  }

  logout() {
    this.authService.logout();
  }
}
