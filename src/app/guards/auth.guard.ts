import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthActivate implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let { authRequired, authRedirectUrl } = route.data;

        console.log(route.url);
        if(typeof authRequired === 'boolean' && authRequired == this.userService.isLogged){
            return true;
        }

        return this.router.parseUrl('/');
    }

}