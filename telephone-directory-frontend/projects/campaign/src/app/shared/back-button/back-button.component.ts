import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'back-button',
    templateUrl: './back-button.component.html',
})
export class BackButtonComponent {
    @Output()
    backClick = new EventEmitter();

    constructor(private location: Location) { }

    back() {
        this.backClick.emit();
        if (!this.backClick.observers.length) {
            this.location.back();
        }
    }
}