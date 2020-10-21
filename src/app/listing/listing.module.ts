import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { AllListingComponent } from './all-listing/all-listing.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddListingComponent } from './add-listing/add-listing.component';

@NgModule({
  declarations: [AllListingComponent, DetailsComponent, AddListingComponent],
  imports: [
    CommonModule,
    ListingRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ListingModule {}
