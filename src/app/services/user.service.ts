import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';
import { tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser | undefined = undefined;
  
  get isLogged(): boolean{
    return this.user != undefined;
  }
  
  constructor(private http: HttpClient) {}

  login(data: { email: string, password: string}) {
    return this.http.post<IUser>(`api/users/login`, data).pipe(
      tap(user =>  {
        this.user = user;
        localStorage.setItem('<USER>', JSON.stringify(this.user));
      })
    );
  }

  register(data: { email: string, username: string, password: string }){
    return this.http.post<IUser>(`api/users/register`, data).pipe(
      tap(user => {
        this.user = user;
        localStorage.setItem('<USER>', JSON.stringify(this.user));
      })
    );
  }

  logout() {
    localStorage.clear();
    return this.http.get(`api/users/logout`).pipe(
      tap(() => this.user = undefined)
    );
  }

  editProfile(data: { email: string, username: string }) {
    return this.http.post<IUser>(`api/users/editProfile`, data).pipe(
      tap(updatedUser => {
        this.user = updatedUser;
        localStorage.setItem('<USER>', JSON.stringify(this.user));
      })
    );
  }
}
