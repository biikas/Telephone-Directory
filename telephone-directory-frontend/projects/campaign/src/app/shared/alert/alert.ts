import { Component, Inject, ElementRef } from '@angular/core';
import { MessageType } from 'nucleus';
import { MatSnackBarRef, SimpleSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface AlertData {
    message: string;
    type: MessageType;
    title?: string;
}

@Component({
    selector: 'alert-box',
    templateUrl: './alert.html',
    host: {
        class: 'alert'
    }
})
export class Alert {
    data: AlertData;

    constructor(
        public alertRef: MatSnackBarRef<SimpleSnackBar>,
        @Inject(MAT_SNACK_BAR_DATA) data: any,
        private elRef: ElementRef
    ) {
        this.data = data;
        this.elRef.nativeElement.classList.add(data.type);
    }

    close() {
        this.alertRef.dismissWithAction();
    }
}