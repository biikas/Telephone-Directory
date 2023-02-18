import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CredentialsService } from '../../core/authentication';

export type FormFieldType = 'NUMERIC' | 'CHECKBOX' | 'RADIO' | 'DROPDOWN' | 'STRING' | 'MOBILE';

export interface FormFieldProperties {
    label: string;
    maxLength: number;
    regex: string;
    inputtype: FormFieldType;
    required: 'Y' | 'N';
    placeHolder: string;
    options?: {
        label: string;
        value: string;
    }[];
    paramOrder: number | string;
    paramValue?: any;
    visible: boolean;
}

@Component({
    selector: 'form-field-builder[formGroup]',
    templateUrl: './form-field-builder.component.html',
    host: {
        '[attr.hidden]': 'props?.visible === "false" ? "" : null'
    }
})
export class FormFieldBuilder {
    private properties: FormFieldProperties;

    @Input()
    formGroup: FormGroup;

    @Input()
    set props(properties: FormFieldProperties) {
        this.properties = properties;
        this.changeDetector.detectChanges();
    }

    get props(): FormFieldProperties {
        return this.properties;
    }

    constructor(
        private changeDetector: ChangeDetectorRef,
        private credentailService: CredentialsService
    ) { }

    setMobileNumber(paramOrder: string) {
        if (this.properties && this.formGroup) {
            const control = this.formGroup.controls[paramOrder];
            control.patchValue(this.credentailService.credentials.username);
            control.markAsTouched();
        }
    }

}