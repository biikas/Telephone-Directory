import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from 'nucleus';
import { OtpField } from './otp-field';

@NgModule({
    imports: [
        CommonModule,
        InputModule
    ],
    declarations: [
        OtpField,
    ],
    exports: [
        OtpField,
    ]
})
export class OtpFieldModule { }