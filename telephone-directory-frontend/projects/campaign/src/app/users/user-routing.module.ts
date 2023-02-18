import { RoutingConstants } from '@core/navigation';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserModule } from './user.module';
import { UserComponent } from './user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDetailComponent } from './users-details/users-detail.component';
import { EditUserComponent } from './edit-user';
import { ResetPasswordComponent } from './reset-password';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
    },
    {
        path: RoutingConstants.CREATE_USER,
        component: CreateUserComponent,
    },
    {
        path: RoutingConstants.ID,
        component: UsersDetailComponent
    },
    {
        path: RoutingConstants.MODIFY_USER + '/' + RoutingConstants.ID,
        component: EditUserComponent,
    },
    {
        path: RoutingConstants.PASSWORD + '/' + RoutingConstants.RESET + '/' + RoutingConstants.ID,
        component: ResetPasswordComponent,
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        UserModule
    ],
    exports: [
        RouterModule
    ]
})

export class UserRoutingModule { }