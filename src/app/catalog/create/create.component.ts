import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { ValidUrlValidate } from 'src/app/shared/validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm!: FormGroup;
  submitted: boolean = false;
  serverErr: string | undefined;

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      destination: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, ValidUrlValidate]],
      freeRooms: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.createForm.invalid) {
      window.scroll({top: 0});
      setTimeout(() => this.submitted = false, 2000);
      return;
    }
    const additionalData = {
      usersBooked: [],
      reviews: [],
      owner: this.userService.user?._id
    }

    const data = Object.assign({}, this.createForm.value, additionalData);
    
    this.contentService.createHotel(data).subscribe({
      next: () => {
        this.router.navigate(['/hotels']);
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    });
    
  }
}
