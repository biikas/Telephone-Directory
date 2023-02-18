import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { Dialog } from '@shared/dialog/dialog';

@Component({
    selector: 'dialog-header',
    templateUrl: './dialog-header.component.html',
    host: {
        class: 'dialog-header'
    }
})

export class DialogHeaderComponent {
    hasCloseButton: boolean;

    @Input()
    title: string;

    @Input()
    set showCloseButton(hasCloseButton: boolean) {
        this.hasCloseButton = coerceBooleanProperty(hasCloseButton);
    }

    get showCloseButton() {
        return this.hasCloseButton;
    }

    constructor(
        private dialog: Dialog
    ) { }

    closeModal() {
        this.dialog.hide();
    }
}