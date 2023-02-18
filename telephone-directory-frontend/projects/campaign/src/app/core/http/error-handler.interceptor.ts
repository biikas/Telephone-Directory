import { Location } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageType } from 'nucleus';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../../shared/alert';
import { CredentialsService } from '../authentication';
import { Logger } from '../logger';
import { Response } from '../response';

const log = new Logger('Error Handler Interceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private alertService: AlertService,
        private location: Location,
        private credential: CredentialsService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Response>> {
        return next.handle(request).pipe(
            map((response) => this.responseMapper(response)),
            catchError((error) => this.errorHandler(error))
        );
    }

    private responseMapper(response: HttpEvent<any>) {
        if (response instanceof HttpResponse && 'success' in response.body && !response.body.success) {
            throw response.body;
        }
        return response;
    }

    private errorHandler(response: HttpEvent<Response>): Observable<HttpEvent<Response>> {
        log.error('Request error', response, response instanceof HttpErrorResponse);
        if (response instanceof HttpErrorResponse) {
            const code = (response.error && response.error.code) || response.status;
            if (code) {
                switch (code) {
                    case 401:
                        this.credential.credentials = null;
                        if (this.location.path().split('?')[0] !== '') {
                            this.router.navigate(['/'], {
                                queryParams: { redirect: this.location.path() },
                                replaceUrl: true
                            });
                        }
                        break;
                    // case 404:
                    //     this.router.navigate([RoutingConstants.NOT_FOUND], { skipLocationChange: true });
                    //     break;
                    case 409:
                        //     this.alert.open({ type: MessageType.ERROR, message: response.error.message });
                        break;
                    // case 500:
                    //     // this.router.navigate([RoutingConstants.SERVER_ERROR], { skipLocationChange: true });
                    //     break;
                    default:
                        this.alertService.open({ type: MessageType.ERROR, message: response.error.message });
                }
            } else {
                // this.alert.open({ type: MessageType.ERROR, message: response.error.message || response.message });
                // this.router.navigate([RoutingConstants.SERVER_ERROR], { skipLocationChange: true });
            }
            throw response.error;
        }
        throw response;
    }
}
