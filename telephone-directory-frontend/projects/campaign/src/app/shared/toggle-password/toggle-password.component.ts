import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

export enum TogglePasswordInputType {
    TEXT = 'text',
    PASSWORD = 'password'
}

@Component({
    selector: 'toggle-password',
    templateUrl: './toggle-password.component.html',
    host: {
        class: 'toggle-password'
    }
})
export class TogglePasswordComponent {
    buttonName = 'eye-slash-outline';

    get type(): TogglePasswordInputType {
        if (this.el.nativeElement.querySelector('input')) {
            return this.el.nativeElement.querySelector('input').getAttribute('type');
        }
        return void 0;
    }

    set type(inputType: TogglePasswordInputType) {
        this.el.nativeElement.querySelector('input').setAttribute('type', inputType);
    }

    @Input() template: TemplateRef<any>;

    @Output() buttonClicked = new EventEmitter<Event>();

    constructor(
        private el: ElementRef<any>
    ) { }

    onClick(event: Event) {
        if (this.type === TogglePasswordInputType.PASSWORD) {
            this.type = TogglePasswordInputType.TEXT;
            this.buttonName = 'eye-open-outline';
        } else {
            this.type = TogglePasswordInputType.PASSWORD;
            this.buttonName = 'eye-slash-outline';
        }
    }
}