
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from '@core/constants/roles-constatnt';
import { MenuGuard } from '@core/guard/menu.guard';
import { CampaignUserType } from '@core/navigation/navigation.service';
import { ContainerComponent } from './container';
import { FullContainer } from './container/full';
import { AuthenticationGuard } from './core/authentication';
import { RoutingConstants } from './core/navigation';
import { LoginComponent } from './login';

const routes: Routes = [
    {
        path: '',
        component: FullContainer,
        children: [
            {
                path: '',
                component: LoginComponent,
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        component: ContainerComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: RoutingConstants.DASHBOARD,
                loadChildren: () => import('./dashboard/dashboard-routing.module').then((module) => module.DashboardRoutingModule),
                canActivate: [MenuGuard],
                data: {
                    // permissions: [
                    //     CampaignUserType.SUPER_ADMIN,
                    //     CampaignUserType.ADMIN
                    // ],
                    role: Roles.ADMIN_HOME,
                }
            },
            {
                path: RoutingConstants.USERS,
                canActivate: [MenuGuard],
                loadChildren: () => import('./users').then((module) => module.UserRoutingModule),
                data: {
                    // permissions: [
                    //     CampaignUserType.SUPER_ADMIN
                    // ],
                    role: Roles.USER,
                }
            },
            {
                path: RoutingConstants.CONTACT,
                loadChildren: () => import('./contact/contact-routing.module').then((module) => module.ContactRoutingModule),
                canActivate: [MenuGuard],
                data: {
                    // permissions: [
                    //     CampaignUserType.SUPER_ADMIN,
                    //     CampaignUserType.ADMIN
                    // ],
                    role: Roles.CONTACT,
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }