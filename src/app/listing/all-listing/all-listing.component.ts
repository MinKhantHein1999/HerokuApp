import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-all-listing',
  templateUrl: './all-listing.component.html',
  styleUrls: ['./all-listing.component.css'],
})
export class AllListingComponent implements OnInit {
  listing$: Observable<Listing>;

  constructor(public listingService: ListingService) {}

  ngOnInit(): void {
    this.listing$ = this.listingService.getAllData();
  }
}
