import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get user(): IUser | undefined {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logged out successfuly!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err.message);
      }
    })
  }

}
