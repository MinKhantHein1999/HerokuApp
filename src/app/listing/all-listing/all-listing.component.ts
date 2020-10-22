import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-all-listing',
  templateUrl: './all-listing.component.html',
  styleUrls: ['./all-listing.component.css'],
})
export class AllListingComponent implements OnInit {
  listing$: Observable<Listing>;

  obj = new FormControl('');

  originalData: Listing[];

  frmGroup: FormGroup;

  constructor(public listingService: ListingService, private fb: FormBuilder) {
    this.frmGroup = fb.group({
      obj: [],
    });
  }

  ngOnInit() {
    // this.listing$ = this.listingService.getAllData();
    this.listingService.getAllData().subscribe((data: Listing[]) => {
      // console.log(data);
      this.originalData = data;
      this.frmGroup.get('obj').valueChanges.subscribe((x) => console.log(x));
      if (this.originalData && this.originalData.length > 0) {
        this.listing$ = this.frmGroup.get('obj').valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text, this.originalData))
        );
      }
    });
  }
  search(text: string, listings: Listing[]): any {
    return listings.filter((listing: Listing) => {
      const term = text.toLowerCase();
      return listing.title && listing.title.toLowerCase().includes(term);
    });
  }
}
