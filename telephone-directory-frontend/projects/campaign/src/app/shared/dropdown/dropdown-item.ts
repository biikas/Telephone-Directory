import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Directive({
    selector: '[dropdownItem]',
    host: {
        role: 'menuitem',
        class: 'dropdown__item'
    }
})
export class DropdownItem implements FocusableOption {
    @Output()
    clicked = new EventEmitter<Event>();

    constructor(
        public elementRef: ElementRef
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.stopPropagation();
        this.clicked.emit(event);
    }

    focus() {
        this.elementRef.nativeElement.focus();
    }
}