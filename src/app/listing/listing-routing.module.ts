import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { AllListingComponent } from './all-listing/all-listing.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: AllListingComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}
