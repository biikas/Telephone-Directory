import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconModule } from '@shared/icon';
import { ButtonModule } from 'nucleus';
import { Alert } from './alert';
import { AlertService } from './alert.service';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        ButtonModule,
        MatSnackBarModule
    ],
    declarations: [
        Alert
    ],
    providers: [
        AlertService
    ],
    exports: [
        Alert,
    ],
    entryComponents: [
        Alert
    ]
})
export class AlertModule { }