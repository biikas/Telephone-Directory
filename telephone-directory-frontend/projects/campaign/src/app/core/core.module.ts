import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard, AuthenticationService } from './authentication';
import { AuthTokenInterceptor, ErrorHandlerInterceptor } from './http';

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
        AuthenticationGuard,
        AuthenticationService,
        AuthTokenInterceptor,
    ]
})
export class CoreModule { }
