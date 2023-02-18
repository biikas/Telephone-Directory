import { RoutingConstants } from './../../core/navigation/routing-constants';
import { UserService } from '../../core/user/user.service';
import { Routes, Router } from '@angular/router';
import { CustomValidators } from './../../shared/validators/validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordPolicyService } from '@core/user/password-policy.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AlertService } from '@shared/alert/alert.service';
import { finalize } from 'rxjs/operators';
import { MessageType, PhoneNumberType } from 'nucleus';
import { EqualValidator } from '@shared/validators/equal-validation-util.service';

@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements OnInit {
    routeToUser = '/' + [RoutingConstants.USERS];
    createUserForm: FormGroup;
    passwordStrength = '';
    pendingRequest: Subscription;
    passwordPolicy: string;

    date = moment();

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private route: Router,
        private passwordPolicyService: PasswordPolicyService,
        private equalValidator: EqualValidator,

    ) {
        this.createUserForm = this.formBuilder.group({
            emailAddress: [null, [CustomValidators.email]],
            name: [null, [Validators.required, CustomValidators.personName]],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required],
            userName: [null, [Validators.required, CustomValidators.alphaNumeric(false)]],
            mobileNumber: [null, [CustomValidators.phoneNumber(PhoneNumberType.MOBILE)]]
        },
            {
                validators: EqualValidator.equalValidator('password', 'confirmPassword')
            });

        this.equalValidator.equalValidate({
            formGroup: this.createUserForm,
            formControlName: ['password', 'confirmPassword'],
            fieldName: 'New Password'
        });
    }

    ngOnInit() {
        //this.passwordPolicyService.getPasswordPolicy().subscribe(({ passwordPolicy }) => this.passwordPolicy = passwordPolicy);
    }

    submit(valid: boolean) {
        if (valid) {
            this.pendingRequest = this.userService.createUser(this.createUserForm.value).
                pipe(finalize(() => this.pendingRequest = null)).subscribe((success) => {
                    this.alertService.open({ message: success.message, type: MessageType.SUCCESS });
                    this.createUserForm.reset();
                    this.route.navigateByUrl(this.routeToUser);
                }, (error) => {
                    this.alertService.open({ message: error.message, type: MessageType.ERROR });
                });
        }
    }

}