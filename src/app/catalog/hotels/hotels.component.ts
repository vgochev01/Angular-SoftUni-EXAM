import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { IHotel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels$!: Observable<IHotel[]>;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels() {
    this.hotels$ = this.contentService.fetchHotels().pipe(
      delay(500)
    );
  }

}
