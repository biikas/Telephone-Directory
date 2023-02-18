import { Component, Input, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-icon, [icon]',
    templateUrl: './icon.component.html',
    host: {
        class: 'icon',
        'aria-hidden': 'false'
    }
})
export class Icon {
    @Input()
    get icon(): string {
        return this.iconName;
    }
    set icon(name: string) {
        this.iconName = `assets/icons.svg#${name}`;
        this.changedDetectorRef.detectChanges();
    }

    @Input()
    set size(value: number) {
        if (value !== null || value !== undefined) {
            this.renderer.setProperty(this.el.nativeElement, 'style', `--icon-size: ${value}px`);
        } else {
            this.renderer.removeStyle(this.el.nativeElement, '--icon-size');
        }
    }

    private iconName: string;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private changedDetectorRef: ChangeDetectorRef
    ) { }
}