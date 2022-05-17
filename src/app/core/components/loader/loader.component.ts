import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  template: '<ngx-loading [show]="show"></ngx-loading>',
  styles: [],
})
export class LoaderComponent implements OnDestroy {
  public subscription: Subscription;
  public show = false;

  constructor(private loaderService: LoaderService) {
    this.subscription = loaderService.isLoading.subscribe(
      (value) => (this.show = value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
