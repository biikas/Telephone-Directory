import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CredentialsService } from '../../core/authentication';

interface ClickType {
    type: string;
}

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
})
export class OtpComponent {
    get username() {
        return this.credentialService.credentials && this.credentialService.credentials.username;
    }

    @Input()
    loader = false;

    @Input()
    formGroup: FormGroup;

    @Input()
    control: FormControl;

    @Output() submit = new EventEmitter();

    otpPreventer = false;

    process(buttonType: string) {
        if (buttonType === 'resendOtp') {
            if (this.otpPreventer) {
                return void 0;
            }
            this.otpPreventer = true;
            setTimeout(() => {
                this.otpPreventer = false;
            }, 5000);
        }
        this.submit.emit({ type: buttonType });
    }

    constructor(
        private credentialService: CredentialsService
    ) { }
}