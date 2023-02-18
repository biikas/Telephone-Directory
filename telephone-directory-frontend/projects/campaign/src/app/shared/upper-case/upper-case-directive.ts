import {
    A,
    Z,
} from '@angular/cdk/keycodes';
import {
    Directive,
    ElementRef,
    HostListener,
    Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appUppercase]',
})
export class UppercaseDirective {

    constructor(@Self() private el: ElementRef, private control: NgControl) { }

    @HostListener('keyup', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // tslint:disable-next-line
        const keyCode = event.keyCode;
        if (event) {
            if (keyCode >= A && keyCode <= Z) {
                const uppercaseValue = this.el.nativeElement.value.toUpperCase();
                this.control.control.setValue(uppercaseValue);
            }
        }
    }
}
