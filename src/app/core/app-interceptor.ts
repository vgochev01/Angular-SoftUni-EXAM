import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

Injectable();
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('in interceptor');
        const userLocalStorage = localStorage.getItem('<USER>');
        if(userLocalStorage){
            const token = JSON.parse(userLocalStorage).accessToken;
            const headers: HttpHeaders = new HttpHeaders({
                'x-authorization': token
            });

            return next.handle(req.clone({
                headers
            }))
        }
        return next.handle(req);
    }

}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];