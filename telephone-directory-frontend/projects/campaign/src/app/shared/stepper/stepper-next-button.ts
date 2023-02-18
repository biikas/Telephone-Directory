import { Directive, HostListener, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Stepper } from './stepper';

@Directive({
    selector: '[stepperNext]'
})
export class StepperNextButton {
    constructor(
        private stepper: Stepper,
        @Optional() private formGroup: FormGroupDirective,
    ) { }

    @HostListener('click')
    next() {
        if (this.formGroup) {
            if (this.formGroup.invalid) {
                this.formGroup.form.markAllAsTouched();
                return;
            }
        }
        this.stepper.next();
    }
}