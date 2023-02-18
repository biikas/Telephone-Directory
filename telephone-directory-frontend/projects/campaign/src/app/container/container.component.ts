import { Component, ViewEncapsulation } from '@angular/core';
import { AppConstants } from '../core';
import { AuthenticationService, CredentialsService } from '../core/authentication';
import { RoutingConstants } from '../core/navigation';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-container'
    }
})

export class ContainerComponent {
    constructor(
        private authService: AuthenticationService,
        public appConstants: AppConstants
    ) {}

    logout(event: Event) {
        if (event) {
            event.preventDefault();
        }
        this.authService.logout();
    }
}