import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Roles } from '@core/constants/roles-constatnt';
import { RoutingConstants } from '@core/navigation';
import { NavigationService } from '@core/navigation/navigation.service';
import { map } from 'rxjs/operators';
import { Logger } from '..';

const log = new Logger('Roles Guard');

@Injectable({
    providedIn: 'root'
})
export class MenuGuard implements CanActivate {
    constructor(
        private router: Router,
        private navigationService: NavigationService,
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let roles: Roles[];
        if (next.data.role) {
            roles = next.data.role as Roles[];
        }
        return this.navigationService.hasPermissions(next.data['role']).pipe(
            map((access) => {
                if (!access) {
                    this.router.navigate([
                        RoutingConstants.generatePath('/')
                    ], { skipLocationChange: true });
                }
                return access;
            })
        );
    }
}
