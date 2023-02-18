import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TIME_REGEX } from './timepicker';

export const timepickerRequriedValidator: ValidatorFn = (control: AbstractControl) => {
    if (typeof control.value === 'string' && control.value.match(TIME_REGEX)) {
        return ;
    }
    return { required: true };
};