import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingConstants } from '@core/navigation';
import { PasswordPolicyService } from '@core/user/password-policy.service';
import { UserService } from '@core/user/user.service';
import { AlertService } from '@shared/alert';
import { EqualValidator } from '@shared/validators/equal-validation-util.service';
import { MessageType } from 'nucleus';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    routeToUser = '/' + [RoutingConstants.USERS];
    resetPasswordForm: FormGroup;
    pendingRequest: Subscription;
    userId: number;
    userName: string;
    passwordPolicy: string;
    isLoading = true;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router,
        private location: Location,
        private passwordPolicyService: PasswordPolicyService,
        private route: ActivatedRoute,
        private equalValidator: EqualValidator,
    ) {
        this.resetPasswordForm = this.formBuilder.group({
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required],
        }, {
            validators: [
                EqualValidator.equalValidator('password', 'confirmPassword')
            ]
        });
        this.equalValidator.equalValidate({
            formGroup: this.resetPasswordForm,
            formControlName: ['password', 'confirmPassword'],
            fieldName: 'New Password'
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
                    .subscribe(({ userName }) => {
                        this.userName = userName;
                        this.userId = userId;
                    }, (error) => {
                        this.alertService.open({
                            message: error.message,
                            type: MessageType.ERROR
                        });
                        this.location.back();
                    });
            });
        } else {
            this.userId = state.id;
            this.userName = state.userName;
        }
    }

    ngOnInit() {
        this.passwordPolicyService.getPasswordPolicy().subscribe(({ passwordPolicy }) => this.passwordPolicy = passwordPolicy);
    }

    resetPasswordSubmit(valid: boolean) {
        if (valid) {
            this.pendingRequest = this.userService.resetPassword({
                userId: this.userId,
                newPassword: this.resetPasswordForm.get('password').value
            }).pipe(finalize(() => {
                this.pendingRequest = null;
            })).subscribe((success) => {
                this.alertService.open({ message: success.message, type: MessageType.SUCCESS });
                this.resetPasswordForm.reset();
                this.router.navigateByUrl(this.routeToUser);
            }, (error) => {
                this.alertService.open({ message: error.message, type: MessageType.ERROR });
            });
        }
    }
}
