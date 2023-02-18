import { Injectable } from '@angular/core';
import { CredentialsService } from '@core/authentication';
import { Roles } from '@core/constants/roles-constatnt';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { RoutingConstants } from './routing-constants';

export interface Menu {
    name: string;
    icon: {
        active: string;
        inactive: string;
    };
    path: string[];
    code: Roles;
}

export enum CampaignUserType {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

@Injectable({
    providedIn: 'root'
})

export class NavigationService {
    navigation: Menu[];

    get menus(): Menu[] {
        this.navigation = [
            {
                name: 'Dashboard',
                icon: {
                    active: 'assets/menus/home-active.png',
                    inactive: 'assets/menus/home-inactive.png'
                },
                path: [RoutingConstants.generatePath(RoutingConstants.DASHBOARD)],
                code: Roles.ADMIN_HOME,
            },
            {
                name: 'Contact',
                icon: {
                    active: 'assets/menus/users-active.png',
                    inactive: 'assets/menus/users-inactive.png'
                },
                path: [RoutingConstants.generatePath(RoutingConstants.CONTACT)],
                code: Roles.SETTINGS,
            },
            // {
            //     name: 'Campaign',
            //     icon: {
            //         active: 'assets/menus/campaigns-active.png',
            //         inactive: 'assets/menus/campaigns-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.CAMPAIGNS)],
            //     code: Roles.CAMPAIGN,
            // },
            // {
            //     name: 'Transaction',
            //     icon: {
            //         active: 'assets/menus/transactions-active.png',
            //         inactive: 'assets/menus/transactions-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.TRANSACTIONS)],
            //     code: Roles.TRANSACTION,
            // },
            // {
            //     name: 'Report',
            //     icon: {
            //         active: 'assets/menus/users-active.png',
            //         inactive: 'assets/menus/users-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.REPORTS)],
            //     code: Roles.REPORT,
            // },
            // {
            //     name: 'Package',
            //     icon: {
            //         active: 'assets/menus/users-active.png',
            //         inactive: 'assets/menus/users-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.PACKAGE)],
            //     code: Roles.PACKAGE,
            // },
            // {
            //     name: 'Redeem Offer',
            //     icon: {
            //         active: 'assets/menus/users-active.png',
            //         inactive: 'assets/menus/users-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.REDEEM)],
            //     code: Roles.REDEEM_OFFER,
            // },
            {
                name: 'User',
                icon: {
                    active: 'assets/menus/users-active.png',
                    inactive: 'assets/menus/users-inactive.png'
                },
                path: [RoutingConstants.generatePath(RoutingConstants.USERS)],
                code: Roles.USER,
            },
            // {
            //     name: 'Settings',
            //     icon: {
            //         active: 'assets/menus/users-active.png',
            //         inactive: 'assets/menus/users-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.SETTINGS)],
            //     code: Roles.SETTINGS,
            // },
            // {
            //     name: 'Contact',
            //     icon: {
            //         active: 'assets/menus/users-active.png',
            //         inactive: 'assets/menus/users-inactive.png'
            //     },
            //     path: [RoutingConstants.generatePath(RoutingConstants.CONTACT)],
            //     code: Roles.SETTINGS,
            // }
        ];
        return this.navigation;
    }

    private storedRoles: Roles[] = [];

    get roles(): Roles[] {
        this.storedRoles = this.credentialService.credentials.roles.map((role) => role.code) || [];
        console.log('stored roles' + this.storedRoles);
        return this.storedRoles;
    }

    constructor(
        private credentialService: CredentialsService
    ) { }

    hasPermissions(code: Roles) {
        return from(code).pipe(
            map((role) => {
                let access = false;
                if (this.roles.some((roles) => code === roles)) {
                    access = true;
                }
                return access;
            }),
            reduce((actualAccess, access) => actualAccess || access)
        );
    }

    hasRole(code: Roles): boolean {
        return this.roles.some((roles) => code === roles);
    }
}