import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/index';
import { AuthenticationService } from '@core/authentication';
import { SharedModule } from '@shared/index';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        CommonModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        AuthenticationService,
    ]
})
export class LoginModule { }