import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IHotel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotel: IHotel | undefined;
  isOwner: boolean = false;
  hasBooked: boolean = false;
  isLogged: boolean = false;

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.fetchHotel(), 555);
    this.isLogged = this.userService.isLogged;
  }

  fetchHotel(): void {
    this.hotel = undefined;
    const { id } = this.activatedRoute.snapshot.params;
    this.contentService.fetchHotelById(id).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.isOwner = this.userService.user?._id == this.hotel._ownerId;
      },
      error: (err) => {
        console.error(err.message);
        this.router.navigate(['/home']);
      }
    });
  }

}
