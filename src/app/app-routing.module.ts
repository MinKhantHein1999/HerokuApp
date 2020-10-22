import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllListingComponent } from './listing/all-listing/all-listing.component';

const routes: Routes = [
  // { path: '', redirectTo: '/listing', pathMatch: 'full' },
  {
    path: 'listing',
    loadChildren: () =>
      import('./listing/listing.module').then((mod) => mod.ListingModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  { path: '**', pathMatch: 'full', component: AllListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
