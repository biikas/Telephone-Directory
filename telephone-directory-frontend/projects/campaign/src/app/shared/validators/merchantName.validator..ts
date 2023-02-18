import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const MERCHANT_NAME_PATTERN = /^[a-zA-Z0-9!@#_$&()\-`.+,\/\"]+[a-zA-Z0-9!@#_$&()\-`. +,\/\"]*$/;
export const merchantNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }
    const value: string = control.value;
    return MERCHANT_NAME_PATTERN.test(value) ? null : { merchantName: true };
};