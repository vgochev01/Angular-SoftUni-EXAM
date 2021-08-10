import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { IHotel } from 'src/app/shared/interfaces';
import { ValidUrlValidate } from 'src/app/shared/validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  editForm$: Observable<FormGroup> | null = null;
  submitted: boolean = false;
  serverErr: string | undefined = undefined;

  editSubscription: Subscription | undefined;

  hotel$: Observable<IHotel> | undefined;
  hotelId: string = ''; 

  constructor(
    private contentService: ContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.hotelId = this.activatedRoute.snapshot.params.id;
    this.editForm$ = this.contentService.fetchHotelById(this.hotelId).pipe(
      map((hotel) => {
        return this.fb.group({
          name: [hotel.name, [Validators.required, Validators.minLength(4)]],
          destination: [hotel.destination, [Validators.required]],
          description: [hotel.description, [Validators.required, Validators.minLength(10)]],
          imageUrl: [hotel.imageUrl, [Validators.required, ValidUrlValidate]],
          freeRooms: [hotel.freeRooms, [Validators.required]],
          price: [hotel.price, [Validators.required, Validators.min(1)]]
        })
      })
    )
  }

  onSubmit(editForm: FormGroup){
    this.submitted = true;
    if(editForm.invalid) {
      window.scroll({top: 0});
      setTimeout(() => this.submitted = false, 2000);
      return;
    }

    const data = editForm.value;
    
    this.editSubscription = this.contentService.editHotel(this.hotelId, data).subscribe({
      next: () => {
        this.router.navigate(['/hotels', this.hotelId]);
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    });

  }

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
    this.editSubscription = undefined;
  }

}
