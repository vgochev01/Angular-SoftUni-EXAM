import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { FormGroup } from '@angular/forms';

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
