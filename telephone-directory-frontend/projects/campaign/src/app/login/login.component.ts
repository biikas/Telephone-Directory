import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AlertData } from '../shared/alert';
import { MessageType } from 'nucleus';
import { AppConstants, Logger } from '../core';
import { AuthenticationService, CredentialsService } from '../core/authentication';
import { RoutingConstants } from '../core/navigation';
import { NavigationService } from '@core/navigation/navigation.service';
import { finalize } from 'rxjs/operators';

const log = new Logger('Log in');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    host: {
        class: 'login'
    }
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isProcessing = false;
    message: AlertData;
    private redirectTo: string;

    constructor(
        formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private credentialService: CredentialsService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private navigationService: NavigationService,
        public appConstants: AppConstants
    ) {
        this.loginForm = formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    ngOnInit() {
        if (this.credentialService.isAuthenticated()) {
            this.router.navigate([RoutingConstants.DASHBOARD]);
        }
        this.route.queryParams.subscribe((params) => {
            if (params && params.redirect) {
                this.redirectTo = params.redirect;
            }
        });
    }

    logIn() {
        this.isProcessing = true;
        this.authService.login(this.loginForm.value).pipe(
            finalize(() => this.isProcessing = false)
        ).subscribe((success) => {
            if (success.success) {
                log.info('Successfully Logged In', this.credentialService.credentials);
                this.credentialService.credentials = {
                    ...success,
                    token: this.credentialService.credentials.token,
                };
                if (!this.redirectTo) {
                    this.router.navigate([RoutingConstants.DASHBOARD]);
                } else {
                    this.router.navigate([decodeURIComponent(this.redirectTo)]);
                }
            }
        }, (error) => {
            this.message = {
                message: error.message,
                type: MessageType.ERROR
            };
            this.alertService.open(this.message);
        });
    }
}