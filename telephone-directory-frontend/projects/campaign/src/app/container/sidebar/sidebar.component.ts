
import { Component, OnInit } from '@angular/core';
import { RoutingConstants } from '@core/navigation';
import { AppConstants } from '../../core';
import { AuthenticationService, CredentialsService } from '../../core/authentication';

@Component({
    selector: '[bsSidebar]',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

    routeToUserProfile = '/' + [RoutingConstants.USER_PROFILE];

    get name() {
        return this.credentialService.credentials && this.credentialService.credentials.name;
    }

    get username() {
        return this.credentialService.credentials && this.credentialService.credentials.username;
    }
    constructor(
        private credentialService: CredentialsService,
        public appConstants: AppConstants,
        private authService: AuthenticationService,
    ) { }

    logOut(event: Event) {
        if (event) {
            event.preventDefault();
        }
        this.authService.logout();
    }
}