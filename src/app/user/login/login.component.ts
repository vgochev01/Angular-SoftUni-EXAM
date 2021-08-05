import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm!: FormGroup;
  serverErr: string | undefined = undefined;
  redirectTo: string | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const { redirectTo } = this.activatedRoute.snapshot.queryParams;
    if(redirectTo) {
      this.redirectTo = redirectTo;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.loginForm.invalid){
      setTimeout(() => this.submitted = false, 2000);
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([(`/${this.redirectTo || ''}` || '/home')]);
      },
      error: (err) => {
        console.log(err.error.message);
        this.serverErr = err.error.message;
        setTimeout(() => this.serverErr = undefined, 2000);
      }
    })
  }

}
