import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHotel } from '../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  fetchHotels() {
    return this.http.get<IHotel[]>(`${apiUrl}/data/catalog`);
  }

  fetchHotelById(id: string) {
    return this.http.get<IHotel>(`${apiUrl}/data/catalog/${id}`);
  }

  createHotel(data: IHotel) {
    return this.http.post<IHotel>(`${apiUrl}/data/catalog`, data, {
      headers: {
        'x-authorization': JSON.parse(localStorage.getItem('<USER>')).accessToken
      }
    });
  }
}
