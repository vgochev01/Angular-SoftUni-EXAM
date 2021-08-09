import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ContentService } from "../services/content.service";
import { UserService } from "../services/user.service";


@Injectable()
export class OwnerActivate implements CanActivate {

    constructor(
        private userService: UserService,
        private contentService: ContentService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { id: hotelId } = route.params;
        
        return this.contentService.fetchHotelById(hotelId).pipe(
            map((hotel) => {
            return hotel._ownerId == this.userService.user?._id;
            })
        );
    }

    
}