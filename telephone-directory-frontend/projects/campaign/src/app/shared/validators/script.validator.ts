import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line
export const SCRIPT_PATTERN = /^(?:(?!<script.*?>([\s\S]*?)<\/script>).)+$/i;

export const scriptValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }
    const value: string = control.value;
    return SCRIPT_PATTERN.test(value) ? null : { pattern: true };
};
