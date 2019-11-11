import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.userService.checkToken();
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization:
                        'Bearer ' + currentUser
                }
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // verify if an error exist
                if (typeof event.body['errors'] !== 'undefined') {
                    // get the status of the error
                    const responseHttpStatus = Number(event.body['errors']['status']);
                    // verify if it's a session error
                    if (responseHttpStatus === 401) {
                        // take the user to the home page to login again
                        if (this.userService.checkToken() !== null) {
                            localStorage.removeItem('spotify-token');
                            this.router.navigateByUrl('/home');
                        }
                    }
                }
            }
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                // verify if it's a session error
                if (error.status === 401) {
                    // take the user to the home page to login again
                    if (this.userService.checkToken() !== null) {
                        localStorage.removeItem('spotify-token');
                        this.router.navigateByUrl('/home');
                    }
                } else {
                    return throwError(error);
                }
            }
        }));
    }
}
