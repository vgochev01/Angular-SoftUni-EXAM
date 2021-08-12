import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IReview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() reviews: IReview[] | undefined = [];
  reviewsForm: FormGroup | null;
  submitted: boolean = false;
  
  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private fb: FormBuilder
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
    }
  }

}
