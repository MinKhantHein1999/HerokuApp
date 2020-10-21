import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonauthGuard } from '../guard/nonauth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonauthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NonauthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
