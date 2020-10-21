import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  EditForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    locality: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
  });

  listing: Listing;

  id: String;

  subListing: Subscription;

  showform: boolean;

  constructor(
    private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subListing = this.listingService
      .getDetails(this.id)
      .subscribe((data) => {
        this.listing = data;
      });
  }

  ngOnDestroy(): void {
    this.subListing.unsubscribe();
  }

  showEdit() {
    this.showform = !this.showform;
  }

  editListing(id: String) {
    if (this.EditForm.valid) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.listingService
        .editListing(this.EditForm.value, this.id)
        .subscribe((data) => {
          this.EditForm.reset();
          this.router.navigate(['listing']);
        });
    }
  }

  deleteListing() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.listingService.deleteListing(this.id).subscribe((data) => {
      this.router.navigate(['listing']);
    });
  }
}
