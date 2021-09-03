import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotel, IReview } from '../shared/interfaces';


@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  fetchHotels(searchedDest: string | undefined = undefined, userId: string | undefined = undefined) {
    let query = '?';
    if(searchedDest){
      query += `dest=${searchedDest}`;
    }
    if(userId) {
      query += `owner=${userId}`;
    }
    return this.http.get<IHotel[]>(`api/data/catalog${query}`);
  }

  fetchHotelById(id: string) {
    return this.http.get<IHotel>(`api/data/catalog/${id}`);
  }

  fetchBookedHotels() {
    return this.http.get<IHotel[]>(`api/users/booked`);
  }

  createHotel(data: IHotel) {
    return this.http.post<IHotel>(`api/data/catalog`, data);
  }

  editHotel(id: string, data: IHotel) {
    return this.http.put<IHotel>(`api/data/catalog/${id}`, data);
  }

  deleteHotel(id: string) {
    return this.http.delete<IHotel>(`api/data/catalog/${id}`);
  }

  postReview(id: string, data: IReview) {
    return this.http.post<IHotel>(`api/data/catalog/${id}/reviews`, data);
  }

  bookRoom(id: string) {
    return this.http.post<IHotel>(`api/data/catalog/${id}/book`, {});
  }
}
