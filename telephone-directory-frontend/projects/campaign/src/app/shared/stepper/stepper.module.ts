import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stepper } from './stepper';
import { IconModule } from '../icon';
import { StepperStep } from './step/step';
import { StepperNextButton } from './stepper-next-button';
import { StepperPreviousButton } from './stepper-previous-button';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        Stepper,
        StepperStep,
        StepperNextButton,
        StepperPreviousButton,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IconModule,
    ],
    exports: [
        Stepper,
        StepperStep,
        StepperNextButton,
        StepperPreviousButton,
    ],
})
export class StepperModule { }
