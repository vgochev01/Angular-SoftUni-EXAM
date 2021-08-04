import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService){};

  ngOnInit(): void {
    const userLocalStorage = localStorage.getItem('<USER>');
    if(userLocalStorage != null){
      try {
        this.userService.user = JSON.parse(userLocalStorage);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
