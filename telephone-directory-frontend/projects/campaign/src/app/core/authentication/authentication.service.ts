import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConstants } from '@core/constants/api.constants';
import { NavigationService } from '@core/navigation/navigation.service';
import { Response } from '../response';
import { Credentials, CredentialsService } from './credentials.service';

export interface AuthenticationCredentials {
    username: string;
    password: string;
}

/**
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
    constructor(
        private credentialsService: CredentialsService,
        private navigationService: NavigationService,
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * Authenticates the user.
     * @param credentials The login parameters.
     * @return The user credentials.
     */
    login(credentials: AuthenticationCredentials) {
        return this.http.post<Response>(
            ApiConstants.generateWebPath(ApiConstants.AUTHENTICATION),
            credentials
        );
    }

    /**
     * Logs out the user and clear credentials.
     * @return True if the user was logged out successfully.
     */
    logout() {
        // Customize credentials invalidation here
        this.credentialsService.credentials = null;
        this.router.navigateByUrl('/');
    }
}
