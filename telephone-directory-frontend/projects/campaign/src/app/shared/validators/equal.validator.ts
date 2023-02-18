import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalValidator(...names: string[]): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        const length = Object.keys(group.controls).length;
        if (length > 1) {
            const values = names.map((name) => group.controls[name].value);
            const isEqual = new Set(values);
            return isEqual.size === 1 ? null : { equal: { fields: names } };
        }
        return null;
    };
}

export function unequalValidator(...names: string[]): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        if (Object.keys(group.controls).length > 1) {
            const values = names.map((name) => group.controls[name].value);
            const isEqual = new Set(values);
            return isEqual.size !== 1 ? null : { unequal: { fields: names } };
        }
        return null;
    };
}