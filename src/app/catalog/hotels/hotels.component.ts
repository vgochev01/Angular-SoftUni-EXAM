import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  query: string | undefined;
  inSearch: boolean = false;
  searchedDest: string = '';

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    let { dest } = this.activatedRoute.snapshot.queryParams;

    if(dest) {
      this.inSearch = true;
      this.searchedDest = dest;
      dest = dest.toLocaleLowerCase();
    }

    this.hotels$ = this.contentService.fetchHotels(dest).pipe(
      delay(500)
    );
  }

}
