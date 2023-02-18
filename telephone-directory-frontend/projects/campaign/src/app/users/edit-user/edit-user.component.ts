import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingConstants } from '@core/navigation/routing-constants';
import { ModifyUserRequest, UserDetail, UserService } from '@core/user/user.service';
import { AlertService } from '@shared/alert';
import { CustomValidators } from '@shared/validators';
import { MessageType, PhoneNumberType } from 'nucleus';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
    routeToUser = '/' + [RoutingConstants.USERS];
    editUserForm: FormGroup;
    pendingRequest: Subscription;
    user: UserDetail;
    isLoading = true;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private alertService: AlertService,
        private location: Location,
        private route: ActivatedRoute,
    ) {
        this.editUserForm = this.formBuilder.group({
            name: [null, [Validators.required, CustomValidators.personName]],
            userName: [{ value: null, disabled: true }],
            emailAddress: [null, [CustomValidators.email]],
            mobileNumber: [null, [CustomValidators.phoneNumber(PhoneNumberType.MOBILE)]],
            active: [null]
        });

        const state: any = this.router.getCurrentNavigation().extras.state;

        if (!state) {
            this.route.paramMap.subscribe((params) => {
                const userId = Number(params.get('id'));
                if (isNaN(userId)) {
                    this.alertService.open({
                        message: 'User not found',
                        type: MessageType.ERROR
                    });
                    this.location.back();
                    return;
                }
                this.isLoading = true;
                this.userService.getUserDetail(userId)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe((user) => {
                        this.setUsers(user);
                    }, (error) => {
                        this.alertService.open({
                            message: error.message,
                            type: MessageType.ERROR
                        });
                        this.location.back();
                    });
            });
        } else {
            this.isLoading = false;
            this.setUsers(state);
        }
    }

    setUsers(user: UserDetail) {
        this.user = user;

        this.editUserForm.patchValue({
            name: this.user.name,
            userName: this.user.userName,
            emailAddress: this.user.emailAddress,
            mobileNumber: this.user.mobileNumber,
            active: this.user.active === 'Y'
        });
    }

    submit(valid: boolean) {
        const modifyUserDetails: ModifyUserRequest = {
            ...this.editUserForm.value,
            active: this.editUserForm.get('active').value === true ? 'Y' : 'N'
        };
        if (valid) {
            this.pendingRequest = this.userService.modifyUser(modifyUserDetails, this.user.id).pipe(finalize(() => {
                this.pendingRequest = null;
            })).subscribe((success) => {
                this.alertService.open({ message: success.message, type: MessageType.SUCCESS });
                this.editUserForm.reset();
                this.router.navigateByUrl(this.routeToUser);
            }, (error) => {
                this.alertService.open({ message: error.message, type: MessageType.ERROR });
            });
        }
    }

}
