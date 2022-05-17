import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualOptionsComponent } from './components/cancela-servico/manual-options/manual-options.component';
import { ReadingErrorComponent } from './components/reading-error/reading-error.component';
import { ReadingSuccessComponent } from './components/reading-success/reading-success.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { IdleComponent } from '../shared/components/idle/idle.component';
import { CancelaComponent } from './components/cancela/cancela.component';

const routes: Routes = [
  {
    path: '',
    component: CancelaComponent,
    children: [
      {
        path: '',
        component: IdleComponent,
      },
      {
        path: 'loading',
        component: LoadingComponent,
      },
      {
        path: 'servico',
        component: ManualOptionsComponent,
      },
      {
        path: 'readingerror',
        component: ReadingErrorComponent,
      },
      {
        path: 'successful',
        component: ReadingSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelaRoutingModule {}
