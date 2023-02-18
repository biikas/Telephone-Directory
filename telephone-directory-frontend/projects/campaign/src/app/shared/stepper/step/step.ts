import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-step',
    templateUrl: './step.html',
    host: {
        class: 'stepper-content'
    }
})
export class StepperStep {
    @Input()
    name: string;

    @ViewChild(TemplateRef, { static: true })
    content: TemplateRef<any>;
}
