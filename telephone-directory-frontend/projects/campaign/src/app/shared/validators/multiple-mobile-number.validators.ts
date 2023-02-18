import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// tslint:disable-next-line
export const MULTIPLE_MOBILE_NUMBER_PATTERN = /^[9][8]\d{8}(,[9][8]\d{8})*$/;

export const multipleMobileNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }

    const value: string = control.value;
    return MULTIPLE_MOBILE_NUMBER_PATTERN.test(value) ? null : {multipleMobileNumber: true};

};