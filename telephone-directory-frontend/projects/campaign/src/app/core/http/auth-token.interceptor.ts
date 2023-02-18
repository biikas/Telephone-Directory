import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@core/authentication';
import { AppConstants } from '@core/constants';
import { Logger } from '@core/logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const log = new Logger('Authorization Token Interceptor');

@Injectable()
export class AuthTokenInterceptor {
    constructor(
        private credential: CredentialsService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Sets authorization token in the request header if present
        const token = this.credential.isAuthenticated() ? this.credential.credentials.token : '';
        log.debug(token);
        // const body = token ? { ...request.body, token } : request.body;
        const header = token ? { Authorization: token } : { };
        const clonedRequest: HttpRequest<any> = request.clone({
            setHeaders: header,
        });

        return next.handle(clonedRequest).pipe(
            // Update the authorization token in the session storage from response header
            map((event: HttpEvent<any>) => {
                log.debug(event);
                if (event instanceof HttpResponse) {
                    const responseToken = event.headers.get(AppConstants.SESSION.AUTHORIZATION);
                    if (responseToken && token !== responseToken) {
                        this.credential.credentials = {
                            ... this.credential.credentials,
                            token: responseToken,
                        };
                    }
                }
                return event;
            }),
        );
    }

}
