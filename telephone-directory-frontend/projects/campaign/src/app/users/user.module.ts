import { RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserComponent } from './user.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { UserService } from '../core/user/user.service';
import { UsersDetailComponent } from './users-details/users-detail.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [
        UserComponent,
        CreateUserComponent,
        UsersDetailComponent,
        EditUserComponent,
        ResetPasswordComponent

    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule

    ],
    exports: [
        UserComponent,
        CreateUserComponent,
        UsersDetailComponent
    ],
    providers: [
        UserService,
    ]
})

export class UserModule { }