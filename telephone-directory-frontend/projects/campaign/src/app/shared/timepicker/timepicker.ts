import { Component, forwardRef, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { AbstractFormField } from 'nucleus/form/common';
import {
    hasModifierKey,
    UP_ARROW,
    DOWN_ARROW,
    ONE,
    ZERO,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    A,
    P,
    M,
    BACKSPACE,
    LEFT_ARROW,
    RIGHT_ARROW,
    HOME,
    END,
    PAGE_DOWN,
    PAGE_UP,
    TAB
} from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';

const HOURS_REGEX = /^(?:0?[1-9]|1?[0-2])$/;
const MINUTES_REGEX = /^(?:0?[0-9]|[1-5][0-9])$/;
const MERIDIEM_REGEX = /^(?:a|p)m?$/;
type TimepickerSlot = 'hour' | 'minute' | 'meridiem';
type Meridiem = 'am' | 'pm';

export const TIME_REGEX = /^(?<hours>0?[1-9]|1[0-2]):(?<minutes>[0-5][0-9]) (?<meridiem>(?:a|p)m)$/i;

@Component({
    selector: 'timepicker-field',
    templateUrl: './timepicker.html',
    host: {
        class: 'timepicker'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Timepicker),
            multi: true
        },
    ]
})
export class Timepicker extends AbstractFormField implements ControlValueAccessor {
    fields: {
        type: TimepickerSlot;
        value: any;
        placeholder?: string;
    }[] = [
            {
                type: 'hour',
                value: null,
                placeholder: '00'
            },
            {
                type: 'minute',
                value: null,
                placeholder: '00'
            },
            {
                type: 'meridiem',
                value: null,
                placeholder: 'am'
            },
        ];

    @ViewChildren(NgControl) controls: QueryList<NgControl>;

    set value(value: string) {
        if (!value) {
            this.hours = null;
            this.minutes = null;
            this.meridiem = null;
            return;
        }
        const capturedValue = value.trim().match(TIME_REGEX);
        if (!capturedValue) {
            throw new Error('Time must be in the \'hh:mm a\' format.');
        }
        const { hours, minutes, meridiem } = capturedValue.groups;
        this.hours = Number(hours);
        this.minutes = Number(minutes);
        this.meridiem = meridiem.toLocaleLowerCase() as Meridiem;
    }
    get value(): string {
        return `${this.convertToTwoDigits(this.hours, 'hour')}:${this.convertToTwoDigits(this.minutes, 'minute')} ${this.meridiem}`;
    }

    set hours(hours: number) {
        this.fields.find((field) => field.type === 'hour').value = hours;
    }
    get hours(): number {
        return this.fields.find((field) => field.type === 'hour').value;
    }

    set minutes(hours: number) {
        this.fields.find((field) => field.type === 'minute').value = hours;
    }
    get minutes(): number {
        return this.fields.find((field) => field.type === 'minute').value;
    }

    set meridiem(meridiem: Meridiem) {
        this.fields.find((field) => field.type === 'meridiem').value = meridiem;
    }
    get meridiem(): Meridiem {
        return this.fields.find((field) => field.type === 'meridiem').value;
    }

    constructor(
        elRef: ElementRef,
        focusMonitor: FocusMonitor
    ) {
        super();
        focusMonitor.monitor(elRef, true).subscribe(() => {
            if (!origin && this.onTouch) {
                this.onTouch(true);
            }
        });
    }

    increment(type: TimepickerSlot, inputEl?: HTMLInputElement) {
        if (inputEl) {
            inputEl.focus();
        }
        switch (type) {
            case 'hour':
                this.hours = this.hours === 12 ? 1 : this.hours + 1;
                break;
            case 'minute':
                this.minutes = this.minutes === 59 ? 0 : this.minutes + 1;
                break;
            case 'meridiem':
                this.meridiem = this.meridiem === 'am' ? 'pm' : 'am';
                break;
        }
        if (this.onChange) {
            this.onChange(this.value);
        }
    }

    decrement(type: TimepickerSlot, inputElRef?: HTMLInputElement) {
        if (inputElRef) {
            inputElRef.focus();
        }
        switch (type) {
            case 'hour':
                this.hours--;
                if (this.hours < 1) {
                    this.hours = 12;
                }
                break;
            case 'minute':
                this.minutes--;
                if (this.minutes < 0) {
                    this.minutes = 59;
                }
                break;
            case 'meridiem':
                this.meridiem = this.meridiem === 'am' ? 'pm' : 'am';
                break;
        }
        if (this.onChange) {
            this.onChange(this.value);
        }
    }

    onKeyDown(event: KeyboardEvent, type: TimepickerSlot) {
        // tslint:disable-next-line
        switch (event.keyCode) {
            case UP_ARROW:
                if (hasModifierKey(event)) {
                    return void 0;
                }
                this.increment(type);
                event.preventDefault();
                break;
            case DOWN_ARROW:
                if (hasModifierKey(event)) {
                    return void 0;
                }
                this.decrement(type);
                event.preventDefault();
                break;
            case ZERO:
            case ONE:
            case TWO:
            case THREE:
            case FOUR:
            case FIVE:
            case SIX:
            case SEVEN:
            case EIGHT:
            case NINE:
                if (hasModifierKey(event)) {
                    event.preventDefault();
                    return false;
                }
                switch (type) {
                    case 'hour':
                        if (!HOURS_REGEX.test(`${typeof this.hours !== 'number' ? '' : this.hours}${event.key}`)) {
                            event.preventDefault();
                            return false;
                        }
                        break;
                    case 'minute':
                        if (!MINUTES_REGEX.test(`${typeof this.minutes !== 'number' ? '' : this.minutes}${event.key}`)) {
                            event.preventDefault();
                            return false;
                        }
                        break;
                }
                break;
            case A:
            case P:
            case M:
                if (hasModifierKey(event) || type !== 'meridiem') {
                    event.preventDefault();
                    return false;
                }
                if (
                    type === 'meridiem' &&
                    !MERIDIEM_REGEX.test(`${typeof this.meridiem !== 'string' ? '' : this.meridiem}${event.key}`)
                ) {
                    event.preventDefault();
                    return false;
                }
                break;
            case BACKSPACE:
            case RIGHT_ARROW:
            case LEFT_ARROW:
            case HOME:
            case END:
            case PAGE_DOWN:
            case PAGE_UP:
            case TAB:
                break;
            default:
                event.preventDefault();
                return false;
        }
    }

    onInput(value: any, type: TimepickerSlot) {
        switch (type) {
            case 'hour':
                this.hours = Number(value);
                break;
            case 'minute':
                this.minutes = Number(value);
                break;
            case 'meridiem':
                this.meridiem = value.toLocaleLowerCase() as Meridiem;
                break;
        }
        if (this.onChange) {
            this.onChange(this.value);
        }
    }

    convertToTwoDigits(num: null | undefined | number, type: TimepickerSlot) {
        if (type === 'meridiem') {
            return num;
        }
        if (typeof num !== 'number') {
            return '';
        }
        const stringNum = num.toString();
        return stringNum.length === 2 ? stringNum : `0${stringNum}`;
    }

    writeValue(value: string): void {
        this.value = value;
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