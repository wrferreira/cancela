import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelaRoutingModule } from './cancela-routing.module';
import { SharedModule } from '../shared/shared.module';

import { IdleComponent } from '../shared/components/idle/idle.component';
import { ReadingErrorComponent } from './components/reading-error/reading-error.component';
import { ManualOptionsComponent } from './components/cancela-servico/manual-options/manual-options.component';
import { PlateComponent } from './components/cancela-servico/templates/plate/plate.component';
import { ChassiComponent } from './components/cancela-servico/templates/chassi/chassi.component';
import { DetailsMotorcycleComponent } from './components/details-motorcycle/details-motorcycle.component';
import { ReadingSuccessComponent } from './components/reading-success/reading-success.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { CancelaComponent } from './components/cancela/cancela.component';
import { SearchComponent } from './components/cancela-servico/templates/search/search.component';
import { MatCarouselModule } from 'ng-mat-carousel';

@NgModule({
  declarations: [
    CancelaComponent,
    IdleComponent,
    LoadingComponent,
    ReadingErrorComponent,
    ManualOptionsComponent,
    PlateComponent,
    ChassiComponent,
    DetailsMotorcycleComponent,
    ReadingSuccessComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    CancelaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCarouselModule.forRoot(),
  ],
})
export class CancelaModule {}
