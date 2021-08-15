import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm!: FormGroup;
  submitted: boolean = false;
  
  constructor(
    private userService: UserService,
    private contentService: ContentService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchedDest: ['', [Validators.required]]
    })
  }

  onSearch(): void {
    this.submitted = true;
    if(this.searchForm.invalid){
      return;
    }
    const dest = this.searchForm.get('searchedDest')!.value;
    this.router.navigate(['hotels'], { queryParams: { dest }})
  }
}
