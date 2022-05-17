import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cancela',
    loadChildren: () =>
      import('./cancela/cancela.module').then((m) => m.CancelaModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./access/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
