import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line
export const ALPHA_PATTERN = /^[A-Za-z\s]+$/i;

export const alphaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }
    const value: string = control.value;
    return ALPHA_PATTERN.test(value) ? null : { alpha: true };
};
