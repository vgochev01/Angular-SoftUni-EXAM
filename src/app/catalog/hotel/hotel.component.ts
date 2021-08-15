import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IHotel, IReview, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit, OnDestroy {

  hotel: IHotel | undefined;
  isOwner: boolean = false;
  showDeleteDialog: boolean = false;
  reviews: IReview[] | undefined;
  hotelsub$: Subscription | undefined;

  showBookedUsers: boolean = false;

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchHotel();
  }

  ngOnDestroy(): void {
    this.hotelsub$?.unsubscribe();
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get hasBooked(): boolean {
    return this.hotel!.usersBooked.find(u => u._id == this.userService.user?._id);
  }

  get usersBooked(): string | undefined {
    return this.hotel?.usersBooked.map(u => u.username).join(', ');
  }

  fetchHotel(): void {
    this.hotel = undefined;
    const { id } = this.activatedRoute.snapshot.params;
    this.hotelsub$ = this.contentService.fetchHotelById(id).pipe(
      delay(500)
    ).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.reviews = hotel.reviews;
        this.isOwner = this.userService.user?._id == this.hotel._ownerId;
      },
      error: (err) => {
        console.error(err.message);
        this.router.navigate(['/home']);
      }
    });
  }

  bookRoom(): void {
    this.contentService.bookRoom(this.hotel!._id).subscribe({
      next: (updatedHotel) => {
        this.hotel = updatedHotel;
        console.log('Successfuly booked a room!');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  showDelete(show: boolean): void {
    this.showDeleteDialog = show;
  }

  updateHotel(data: IHotel) {
    this.hotel = data;
  }

  showBookedUsersToggle() {
    this.showBookedUsers = !this.showBookedUsers;
  }

}
