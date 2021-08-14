import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { IHotel, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hotels: IHotel[] = [];
  editProfileForm!: FormGroup;

  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private fb: FormBuilder
  ) { }

    get user(): IUser {
      return this.userService.user!;
    }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.editProfileForm!.invalid){
      setTimeout(() => this.submitted = false, 2000);
      return;
    }
    const data = this.editProfileForm.value;
    this.userService.editProfile(data).subscribe({
      next: () => {
        alert('User Data Updated!');
      },
      error: (err) => {
        console.error(err.message);
      }
    })

  }
}
