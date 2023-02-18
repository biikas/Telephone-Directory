import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'user-avatar',
    templateUrl: './avatar.component.html',
    host: {
        class: 'avatar',
    }
})
export class AvatarComponent {
    @Input() title: string;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(
            this.elRef.nativeElement,
            `avatar--variant-${Math.floor(Math.random() * Math.floor(12)) + 1}`
        );
    }

    nameInitial(name: string) {
        if (name) {
            return name.charAt(0).toUpperCase();
        }
    }

    @Input()
    set size(value: string) {
        if (value) {
            this.renderer.addClass(this.elRef.nativeElement, `avatar--${value}`);
        } else {
            this.renderer.removeClass(this.elRef.nativeElement, `avatar--${value}`);
        }
    }
}