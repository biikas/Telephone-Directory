import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { StepperStep } from './step/step';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.html',
    host: {
        class: 'stepper'
    },
    exportAs: 'stepper'
})
export class Stepper implements AfterContentInit {

    @ContentChildren(StepperStep, { descendants: true })
    steps: QueryList<StepperStep>;

    stepperPosition: number;
    selectedStep: StepperStep;

    get position() {
        return this.stepperPosition;
    }

    set position(position) {
        this.stepperPosition = position;
        this.selectedStep = this.steps.toArray()[position];
    }

    ngAfterContentInit() {
        if (!this.position) {
            this.position = 0;
        }
    }

    next() {
        if (this.steps.length - 1 !== this.stepperPosition) {
            this.position = this.position + 1;
        }
    }

    previous() {
        if (this.stepperPosition !== 0) {
            this.position = this.position - 1;
        }
    }
}
