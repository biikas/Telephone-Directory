import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    Input,
    Renderer2,
    ContentChildren,
    QueryList,
    OnDestroy
} from '@angular/core';
import { NgControl as AbstractControl } from '@angular/forms';
import { Icon } from '@shared/icon';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NDButton } from 'nucleus';

@Component({
    selector: 'form-control-wrapper',
    templateUrl: './form-control-wrapper.component.html',
    host: {
        class: 'form-control-wrapper',
    }
})
export class FormControlWrapper implements AfterContentInit, OnDestroy {
    @Input()
    iconName: string;

    @ContentChild(AbstractControl, { read: ElementRef, static: true })
    controlEl: ElementRef;

    @ContentChild(AbstractControl, { read: NgSelectComponent, static: true })
    select: NgSelectComponent;

    @ContentChildren(Icon, { read: ElementRef })
    icons: QueryList<ElementRef>;

    @ContentChildren(NDButton, { read: ElementRef })
    buttons: QueryList<ElementRef>;

    private unlisteners: (() => void)[] = [];

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef
    ) { }

    ngAfterContentInit() {
        if (this.controlEl) {
            const el = this.controlEl.nativeElement;
            this.renderer.addClass(el, 'form-control-wrapper__control');
            const isDisabled = !this.select ? (el.disabled || el.readonly) : this.select.readonly;
            if (isDisabled) {
                this.renderer.addClass(this.elRef.nativeElement, 'is-disabled');
            } else {
                this.unlisteners.push(this.renderer.listen(el, 'mouseover', this.enterHandler.bind(this)));
                this.unlisteners.push(this.renderer.listen(el, 'mouseout', this.exitHandler.bind(this)));
                this.unlisteners.push(this.renderer.listen(el, 'focus', this.focusHandler.bind(this)));
                this.unlisteners.push(this.renderer.listen(el, 'blur', this.blurHandler.bind(this)));
            }
        }
        this.icons.forEach((icon) => {
            this.renderer.addClass(icon.nativeElement, 'form-control-wrapper__icon');
        });
        this.icons.changes.subscribe(() => {
            this.icons.forEach((icon) => {
                this.renderer.addClass(icon.nativeElement, 'form-control-wrapper__icon');
            });
        });
        this.buttons.forEach((icon) => {
            this.renderer.addClass(icon.nativeElement, 'form-control-wrapper__icon');
        });
        this.buttons.changes.subscribe(() => {
            this.buttons.forEach((icon) => {
                this.renderer.addClass(icon.nativeElement, 'form-control-wrapper__icon');
            });
        });
    }

    enterHandler() {
        this.renderer.addClass(this.elRef.nativeElement, 'is-hovering');
    }

    exitHandler() {
        this.renderer.removeClass(this.elRef.nativeElement, 'is-hovering');
    }

    focusHandler() {
        this.renderer.addClass(this.elRef.nativeElement, 'is-focused');
    }

    blurHandler() {
        this.renderer.removeClass(this.elRef.nativeElement, 'is-focused');
    }

    ngOnDestroy() {
        this.unlisteners.forEach((unlistener) => {
            unlistener();
        });
    }
}