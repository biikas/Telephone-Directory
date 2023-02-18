import { Injectable } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import { FormFieldProperties } from './form-field-builder.component';

export interface PayableLimit {
    payableLimit: {
        fixedAmount: number;
        maxAmount: number;
        minAmount: number;
    }[];
    payableLimitType: string;
}

export interface FormFieldGroup extends PayableLimit {
    fields: FormFieldProperties[];
}

@Injectable()
export class FormFieldBuilderService {
    updateForm(group: FormFieldGroup, form: FormGroup) {
        if (Object.keys(form.controls).length) {
            Object.keys(form.controls).forEach((name) => {
                const formField = group.fields.find((field) => {
                    if (field.inputtype === 'CHECKBOX') {
                        return !!field.options.find((option) => option.label === name);
                    }
                    return field.paramOrder.toString() === name;
                });
                // if (!formField) {
                //     form.removeControl(name);
                // }
            });
        }
        group.fields.forEach((field) => {
            const validators: ValidatorFn[] = [];
            if (field.regex) {
                validators.push(Validators.pattern(new RegExp(field.regex)));
            }
            if (field.required === 'Y') {
                validators.push(Validators.required);
            }
            if (field.maxLength) {
                validators.push(Validators.maxLength(field.maxLength));
            }
            if (field.inputtype === 'NUMERIC') {
                if (field.paramOrder === 0) {
                    if (group.payableLimitType === 'F') {
                        field.inputtype = 'DROPDOWN';
                        field.options = group.payableLimit.map((limit) => {
                            return {
                                label: limit.fixedAmount.toString(),
                                value: limit.fixedAmount.toString()
                            };
                        });
                    } else if (group.payableLimitType === 'R') {
                        validators.push(Validators.min(group.payableLimit[0].minAmount));
                        validators.push(Validators.max(group.payableLimit[0].maxAmount));
                    }
                }
            }
            if (form.get(field.paramOrder.toString())) {
                form.get(field.paramOrder.toString()).clearValidators();
                form.get(field.paramOrder.toString()).setValidators(validators);
            } else {
                if (field.inputtype === 'CHECKBOX') {
                    field.options.forEach((option) => {
                        form.addControl(option.label, new FormControl(null));
                    });
                } else {
                    form.addControl(field.paramOrder.toString(), new FormControl(null, { validators }));
                }
            }
            if (field.inputtype === 'DROPDOWN') {
                form.get(field.paramOrder.toString()).setValue(field.options[0].value);
            }
        }, {});
    }

    // setValues(payment: SmartPayment, form: FormGroup) {
    //     payment.fields.forEach((field) => {
    //         const name = field.paramOrder.toString();
    //         if (form.get(name)) {
    //             form.get(name).setValue(field.paramValue);
    //         }
    //     });
    // }
}