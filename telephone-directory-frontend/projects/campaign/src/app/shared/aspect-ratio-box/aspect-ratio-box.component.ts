import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
    selector: 'aspect-ratio-box',
    templateUrl: './aspect-ratio-box.component.html',
    host: {
        class: 'aspect-ratio-box'
    }
})
export class AspectRatioComponent {
    @Input() src: string;
    @Input() alt: string;
    @Input() srcset = '';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    @Input()
    set ratio(value: number) {
        const ratioValue = coerceNumberProperty(value);
        if (ratioValue) {
            this.renderer.setProperty(this.el.nativeElement, 'style', `--aspect-ratio: ${ratioValue}`);
        } else {
            this.renderer.removeStyle(this.el.nativeElement, '--aspect-ratio');
        }
    }
}