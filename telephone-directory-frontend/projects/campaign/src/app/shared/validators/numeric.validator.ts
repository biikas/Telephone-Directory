import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum NumberType {
    NATURAL = 'natural',
    DECIMAL = 'decimal',
}
export interface NumberValidatorOption {
    type?: NumberType;
}

export const NUMBER_PATTERN = /^[0-9][\.\d]*(,\d+)?$/i;
export const NATURAL_NUMBER_PATTERN = /^[1-9][0-9]*$/i;

export function numericValidator(options?: NumberValidatorOption): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value: string = control.value;
        if (options && options.type === NumberType.NATURAL) {
            if (NATURAL_NUMBER_PATTERN.test(value)) {
                return null;
            } else {
                return {
                    number: {
                        type: options.type.toString()
                    }
                };
            }
        } else {
            if (NUMBER_PATTERN.test(value)) {
                return null;
            } else {
                return { number: true };
            }
        }
    };
}
