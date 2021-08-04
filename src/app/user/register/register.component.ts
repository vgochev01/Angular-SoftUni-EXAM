import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { passMatchingFactory } from './passwords-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { 
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
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.registerForm.invalid){
      setTimeout(() => this.submitted = false, 2000)
    }
    console.log(this.registerForm.value);
    console.log(localStorage);
  }

}
