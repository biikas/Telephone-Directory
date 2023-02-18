import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const NAME_PATTERN = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }
    const value: string = control.value;
    return NAME_PATTERN.test(value) ? null : { name: true };
};
