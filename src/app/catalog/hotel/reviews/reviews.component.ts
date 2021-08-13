import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IHotel, IReview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnDestroy {

  @Input() reviews: IReview[] | undefined = [];
  @Output() updateHotel: EventEmitter<IHotel> = new EventEmitter();
  reviewsForm: FormGroup | null;
  submitted: boolean = false;
  subscription$: Subscription | null = null;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.reviewsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  onSubmit() {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 2000);
    if(this.reviewsForm?.valid){
      const { id } = this.activatedRoute.snapshot.params;
      this.subscription$ = this.contentService.postReview(id, this.reviewsForm.value).subscribe({
        next: (updatedHotel) => {
          this.updateHotel.emit(updatedHotel);
          this.reviews = updatedHotel.reviews;
          this.submitted = false;
          this.reviewsForm?.reset();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

}
