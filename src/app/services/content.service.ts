import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotel } from '../shared/interfaces';

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  fetchHotels() {
    return this.http.get<IHotel[]>('http://localhost:5000/data/catalog');
  }
}
