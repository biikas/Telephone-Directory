import { Component, ElementRef, Renderer2, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export type ProgressBarType = 'default' | 'stepped';

@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.html',
    host: {
        class: 'progress-bar'
    }
})
export class ProgressBar {
    width = 0;

    @Input()
    range?: {
        condition: '==' | '<' | '<=' | '>' | '>=',
        value: number,
        state: 'success' | 'warn' | 'error' | 'info';
    }[] = [];

    @Input()
    set type(value: ProgressBarType) {
        const stepped = value === 'stepped';
        if (stepped) {
            if (!this.range.length) {
                throw new Error('A range must be defined for stepped progress bar.');
            }
        }
    }

    @Input()
    get progress(): string | number {
        return this.width;
    }
    set progress(value: string | number) {
        const width = coerceNumberProperty(value);
        if (width !== this.width) {
            if (this.range.length) {
                this.setState(width, this.width);
            }
            this.width = width;
        }
    }

    constructor(
        private elRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    private setState(newValue: number, oldValue?: number) {
        if (typeof (oldValue) !== 'undefined' && oldValue !== newValue) {
            this.renderer.removeClass(this.elRef.nativeElement, this.stateFromWidth(oldValue));
        }
        if (newValue !== oldValue) {
            this.renderer.addClass(this.elRef.nativeElement, this.stateFromWidth(newValue));
        }
    }

    private stateFromWidth(value: number): string {
        return this.range.find((range) => {
            switch (range.condition) {
                case '==':
                    return value === range.value;
                case '<':
                    return value < range.value;
                case '<=':
                    return value <= range.value;
                case '>':
                    return value > range.value;
                case '>=':
                    return value >= range.value;
            }
        }).state;
    }
}