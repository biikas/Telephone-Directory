import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, forwardRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Logger } from '@core/index';
import { AbstractFormField } from 'nucleus/form/common';

const log = new Logger('OTP Field');

@Component({
    selector: 'otp-field',
    templateUrl: './otp-field.html',
    host: {
        class: 'otp-field'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OtpField),
            multi: true
        },
    ]

})
export class OtpField extends AbstractFormField implements ControlValueAccessor, OnDestroy {
    characters = ['', '', '', '', '', ''];

    @Input()
    set length(value: number) {
        this.characters.length = 0;
        this.placeholderForCharacters.length = 0;
        for (let i = 0; i < value; i++) {
            this.characters.push('');
        }
        this.placeholderForCharacters = this.characters.map(() => '');
    }
    get length(): number {
        return this.characters.length;
    }

    placeholderForCharacters = [...this.characters];

    constructor(
        private render: Renderer2,
        private focusMonitor: FocusMonitor,
        private elRef: ElementRef,
    ) {
        super();
        focusMonitor.monitor(elRef, true).subscribe((origin) => {
            if (!origin) {
                if (this.onTouch) {
                    this.onTouch(this.value);
                }
            }
        });
    }

    inputTabIndex(index: number): 0 | -1 {
        if (index === 0) {
            return 0;
        }
        if (this.characters[index - 1]) {
            return 0;
        }
        return -1;
    }

    onKeyDown(event: KeyboardEvent, index: number) {
        const currentValue = this.characters[index];
        if (event.key === 'Backspace' && !currentValue && index !== 0) {
            const prarentEl: HTMLElement = this.render.parentNode(event.target);
            (prarentEl.children[index - 1] as HTMLInputElement).select();
        }
        if (event.key === 'ArrowRight') {
            if (this.length !== index + 1 && this.inputTabIndex(index + 1) === 0) {
                this.render.nextSibling(event.target).select();
                event.preventDefault();
            }
        }
        if (event.key === 'ArrowLeft' && index !== 0) {
            const prarentEl: HTMLElement = this.render.parentNode(event.target);
            (prarentEl.children[index - 1] as HTMLInputElement).select();
            event.preventDefault();
        }
    }

    onInput(event: Event, index: number) {
        const currentValue = this.characters[index];
        this.characters[index] = ((event.target as HTMLInputElement).value);
        if (currentValue !== this.characters[index]) {
            if (index < this.length - 1 && this.characters[index]) {
                this.render.nextSibling(event.target).focus();
            }
            this.value = this.characters.join('');
            if (this.onChange) {
                this.onChange(this.value);
            }
        }
    }

    onFocus(event: Event, index: number) {
        const target = event.target as HTMLInputElement;
        if (!target.value) {
            const prarentEl: HTMLElement = this.render.parentNode(target);
            const prevSibling = prarentEl.children[index !== 0 ? index - 1 : 0] as HTMLInputElement;
            if (!prevSibling.value) {
                prevSibling.focus();
            }
        } else {
            target.select();
        }
    }

    onPaste(event: ClipboardEvent, index: number) {
        const value = event.clipboardData.getData('text');
        value.split('').forEach((character, characterIndex) => {
            if (characterIndex < this.characters.length) {
                this.characters[index + characterIndex] = character;
            }
        });
        this.value = this.characters.join('');
        if (this.onChange) {
            this.onChange(this.value);
        }
        event.preventDefault();
    }

    writeValue(value: string): void {
        this.value = value || '';
        this.characters.forEach((character: string, index: number) => {
            this.characters[index] = this.value.charAt(index);
        });
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

    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elRef);
    }
}