import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { VistausuarioComponent } from './pages/vistausuario/vistausuario.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'nuevo-usuario', component: NewuserComponent },
  { path: 'user/:id', component: VistausuarioComponent },
  { path: 'updateuser/:id', component: NewuserComponent },
  { path: '**', redirectTo: 'home' },
];
