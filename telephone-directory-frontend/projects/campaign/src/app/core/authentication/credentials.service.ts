import { Injectable } from '@angular/core';
import { Roles } from '@core/constants/roles-constatnt';
import { CampaignUserType } from '@core/navigation/navigation.service';

export interface UserRoles {
    name: string;
    code: Roles;
    description: string;
}

export interface Credentials {
    type?: CampaignUserType;
    token: string;
    username?: string;
    name?: string;
    emailAddress?: string;
    roles?: UserRoles[];
}

const CREDENTIALS_KEY = 'credentials';

/**
 * Provides storage for authentication credentials.
 */
@Injectable({
    providedIn: 'root'
})
export class CredentialsService {
    private savedCredentials: Credentials | null = null;

    constructor() {
        const savedCredentials = sessionStorage.getItem(CREDENTIALS_KEY);
        if (savedCredentials) {
            this.savedCredentials = JSON.parse(savedCredentials);
        }
    }

    /**
     * Checks is the user is authenticated.
     * @return True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.savedCredentials;
    }

    /**
     * Gets the user credentials.
     * @return The user credentials or null if the user is not authenticated.
     */
    get credentials(): Credentials | null {
        return this.savedCredentials;
    }

    /**
     * Sets the user credentials.
     * The credentials are only persisted for the current session.
     * @param credentials The user credentials.
     */
    set credentials(credentials: Credentials) {
        this.savedCredentials = credentials;
        if (credentials) {
            sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify(this.savedCredentials));
        } else {
            sessionStorage.removeItem(CREDENTIALS_KEY);
        }
    }
}
