import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line
export const ALPHA_NUMERIC_PATTERN = /^[a-zA-Z0-9 ]*$/i;
export const ALPHA_NUMERIC_PATTERN_SINGLE_SPACE = /^[a-zA-Z\d]+(?: [a-zA-Z\d]+)*$/;
export const alphaNumbericValidator: (withSpace?: boolean) => ValidatorFn = (withSpace = true) =>
    (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value: string = control.value;
        return withSpace
            ? ALPHA_NUMERIC_PATTERN_SINGLE_SPACE.test(value) ? null : { alphaNumeric: { space: true } }
            : ALPHA_NUMERIC_PATTERN.test(value) ? null : { alphaNumeric: true };
    };
