import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Listing } from './listing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  public base_Url = 'http://localhost:8080/';
  // public base_Url = '';
  public Options = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('auth-token', localStorage.getItem('token')),
  };

  constructor(private http$: HttpClient) {}

  getAllData(): Observable<Listing> {
    return this.http$.get<any>(this.base_Url + 'api/listing');
  }

  getDetails(id: String) {
    return this.http$.get<Listing>(`${this.base_Url + 'api/listing'}/${id}`);
  }

  addListing(listing) {
    return this.http$.post<any>(
      `${this.base_Url + 'api/listing'}`,
      listing,
      this.Options
    );
  }

  editListing(listing, id: String) {
    return this.http$.put<any>(
      `${this.base_Url + 'api/listing'}/${id}`,
      listing,
      this.Options
    );
  }

  deleteListing(id: String) {
    return this.http$.delete<any>(
      `${this.base_Url + 'api/listing'}/${id}`,
      this.Options
    );
  }
}
