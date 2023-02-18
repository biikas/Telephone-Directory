import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
    selector: 'form[formGroup][validateAndSubmit]'
})
export class ValidateAndSubmit {
    constructor(
        private formGroup: FormGroupDirective
    ) { }

    @Output()
    validateAndSubmit: EventEmitter<boolean> = new EventEmitter();

    @HostListener('submit')
    onSubmit() {
        this.formGroup.form.markAllAsTouched();
        this.formGroup.form.updateValueAndValidity();
        this.validateAndSubmit.emit(this.formGroup.form.valid);
    }
}