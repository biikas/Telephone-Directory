import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    host: {
        class: 'page-header',
        role: 'header',
        '[attr.aria-label]': 'title'
    }
})
export class PageHeaderComponent {
    @Input()
    title: string;

    @Input()
    set showBack(shouldShowBack: any) {
        this.shouldShowBack = coerceBooleanProperty(shouldShowBack);
    }
    get showBack() {
        return this.shouldShowBack;
    }

    @Output()
    backClick = new EventEmitter();

    public shouldShowBack: boolean;

    constructor(private location: Location) { }

    back() {
        this.backClick.emit();
        if (!this.backClick.observers.length) {
            this.location.back();
        }
    }
}