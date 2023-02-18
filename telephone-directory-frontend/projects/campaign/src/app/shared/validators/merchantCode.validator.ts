import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const MERCHANT_CODE_PATTERN = /^[a-zA-Z0-9_]*$/;
export const merchantCodeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }
    const value: string = control.value;
    return MERCHANT_CODE_PATTERN.test(value) ? null : { merchantCode: true };
};