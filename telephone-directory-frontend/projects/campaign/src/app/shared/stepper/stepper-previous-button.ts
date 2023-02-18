import { Directive, HostListener } from '@angular/core';
import { Stepper } from './stepper';

@Directive({
    selector: '[stepperPrevious]'
})
export class StepperPreviousButton {
    constructor(
        private stepper: Stepper,
    ) { }

    @HostListener('click')
    previous() {
        this.stepper.previous();
    }
}