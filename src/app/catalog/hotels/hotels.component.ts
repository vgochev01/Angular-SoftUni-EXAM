import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { IHotel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: IHotel[] | undefined;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    setTimeout(() => this.fetchHotels(), 2000);
  }

  fetchHotels(): void {
    this.hotels = undefined;
    this.contentService.fetchHotels().subscribe(hotels => this.hotels = hotels);
  }

}
