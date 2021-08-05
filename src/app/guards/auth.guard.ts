import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthActivate implements CanActivate {

    queryStr: string = '';

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let { authRequired } = route.data;

        const previousUrl = this.router.routerState.snapshot.url;

        if(typeof authRequired === 'boolean' && authRequired == this.userService.isLogged){
            // this.queryStr = previousUrl ? `?redirectTo=${previousUrl.slice(1)}` : '';
            // const url = `/${route.url[0].path}${this.queryStr}`;
            // console.log(url);
            return true;
        }

        if(authRequired == true && (this.userService.isLogged == false)){
            this.router.navigate(['/login'], { queryParams: { redirectTo: previousUrl.slice(1) }});
            return false;
        }

        return this.router.parseUrl('/');

    }

}