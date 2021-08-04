import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user';
import { tap } from 'rxjs/operators'

const apiUrl = environment.apiUrl;

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
    return this.http.post<IUser>(`${apiUrl}/users/login`, data).pipe(
      tap(user =>  {
        this.user = user;
        localStorage.setItem('<USER>', JSON.stringify(this.user));
      })
    );
  }

  register(data: { email: string, username: string, password: string }){
    return this.http.post<IUser>(`${apiUrl}/users/register`, data).pipe(
      tap(user => {
        this.user = user;
        localStorage.setItem('<USER>', JSON.stringify(this.user));
      })
    );
  }

  logout() {
    localStorage.clear();
    return this.http.get(`${apiUrl}/users/logout`).pipe(
      tap(() => this.user = undefined)
    );
  }
}
