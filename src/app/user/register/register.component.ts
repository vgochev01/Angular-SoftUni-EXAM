import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { passMatchingFactory } from './passwords-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  registerForm!: FormGroup;
  serverErr: string | undefined = undefined;

  registersub$: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { 
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), passMatchingFactory(() => this.registerForm?.get('password')!)]]
    });
  }

  ngOnDestroy() {
    this.registersub$?.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.registerForm.invalid){
      setTimeout(() => this.submitted = false, 2000)
      return;
    }
    this.registersub$ = this.userService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err.error.message);
        this.serverErr = err.error.message;
        setTimeout(() => this.serverErr = undefined, 2000);
      }
    })
  }

}
