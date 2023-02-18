import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CredentialsService } from '@core/authentication';
import { Menu, NavigationService } from '@core/navigation/navigation.service';
@Component({
    selector: '[mainNav]',
    templateUrl: './main-nav.component.html',
})
export class MainNavComponent implements OnInit {
    menus: Menu[];
    authorizedMenu: Menu[] = [];

    constructor(
        private authService: AuthenticationService,
        private navigationService: NavigationService,
        private credentialService: CredentialsService,
    ) { }

    logout(event: Event) {
        event.preventDefault();
        this.authService.logout();
    }

    ngOnInit() {
        if (this.credentialService.credentials && this.credentialService.credentials.roles) {
            this.menus = this.navigationService.menus;
            this.authorizedMenu = this.getAuthorizedMenus(this.menus);
        }
    }

    getAuthorizedMenus(menus: Menu[]): Menu[] {
        return this.menus.filter((menu: Menu) => {
            return this.navigationService.hasRole(menu.code);
        })
    }
}