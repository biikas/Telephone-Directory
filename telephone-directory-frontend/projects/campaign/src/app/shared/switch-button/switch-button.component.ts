import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormField } from 'nucleus/form/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'switch-button',
    templateUrl: './switch-button.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchButtonComponent),
            multi: true
        },
    ]
})

export class SwitchButtonComponent extends AbstractFormField implements ControlValueAccessor {
    @Input()
    get checked() {
        return this.isChecked;
    }
    set checked(value: string | undefined | null | boolean) {
        const isChecked = coerceBooleanProperty(value);
        if (this.isChecked !== isChecked) {
            this.isChecked = isChecked;
        }
    }
    isChecked: boolean;

    onInputChange(isChecked: boolean) {
        if (this.onChange) {
            this.onChange(isChecked);
        }
    }

    writeValue(value: boolean): void {
        this.value = value;
        this.checked = !!value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}