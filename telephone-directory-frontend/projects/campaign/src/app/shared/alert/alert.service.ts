import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertData, Alert } from './alert';

@Injectable()
export class AlertService {
    constructor(
        private snackbar: MatSnackBar
    ) { }

    open(data: AlertData) {
        this.snackbar.openFromComponent(Alert, {
            data,
            duration: 5000,
            panelClass: 'alert-container',
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    close() {
        this.snackbar.dismiss();
    }
}