import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface EqualValidatorOptions {
    formGroup: FormGroup;
    formControlName: string[];
    fieldName: string;
}

@Injectable({
    providedIn: 'root'
})
export class EqualValidator {
    static equalValidator(...names: string[]): ValidatorFn {
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

    static unequalValidator(...names: string[]): ValidatorFn {
        return (group: FormGroup): ValidationErrors | null => {
            if (Object.keys(group.controls).length > 1) {
                const values = names.map((name) => group.controls[name].value);
                const isEqual = new Set(values);
                return isEqual.size !== 1 ? null : { unequal: { fields: names } };
            }
            return null;
        };
    }

    unequalValidate(param: EqualValidatorOptions) {
        const { formGroup, formControlName, fieldName } = param;
        formGroup.statusChanges.subscribe(() => {
            const formControls = formControlName.map((name) => formGroup.controls[name]);
            const lastFormControl = formControls[formControls.length - 1];
            if (formGroup.hasError('unequal')) {
                if (formControls.every((control) => control.value)) {
                    if (!lastFormControl.hasError('unequal')) {
                        const errors = { ...lastFormControl.errors };
                        lastFormControl.setErrors({
                            unequal: {
                                field: fieldName
                            },
                            ...errors
                        });
                    }
                }
            } else {
                if (lastFormControl.hasError('unequal')) {
                    const { unequal, ...errors } = lastFormControl.errors;
                    const newErrors = Object.values(errors).length ? errors : null;
                    lastFormControl.setErrors(newErrors);

                }
            }
        });
    }

    equalValidate(param: EqualValidatorOptions) {
        const { formGroup, formControlName, fieldName } = param;
        formGroup.statusChanges.subscribe(() => {
            const formControls = formControlName.map((name) => formGroup.controls[name]);
            const lastFormControl = formControls[formControls.length - 1];
            if (formGroup.hasError('equal')) {
                if (formControls.every((control) => control.value)) {
                    if (!lastFormControl.hasError('equal')) {
                        const errors = { ...lastFormControl.errors };
                        lastFormControl.setErrors({
                            equal: {
                                field: fieldName
                            },
                            ...errors
                        });
                    }
                }
            } else {
                if (lastFormControl.hasError('equal')) {
                    const { equal, ...errors } = lastFormControl.errors;
                    const newErrors = Object.values(errors).length ? errors : null;
                    lastFormControl.setErrors(newErrors);
                }
            }
        });
    }
}