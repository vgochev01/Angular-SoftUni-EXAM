import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

Injectable();
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userLocalStorage = localStorage.getItem('<USER>');
        const url = req.url.replace('api', apiUrl);
        if(userLocalStorage){
            const token = JSON.parse(userLocalStorage).accessToken;
            const headers: HttpHeaders = new HttpHeaders({
                'x-authorization': token
            });

            return next.handle(req.clone({
                headers,
                url
            }))
        }
        return next.handle(req.clone({
            url
        }));
    }

}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];