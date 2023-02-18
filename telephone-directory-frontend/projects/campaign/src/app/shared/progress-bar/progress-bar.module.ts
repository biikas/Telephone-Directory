import { NgModule } from '@angular/core';
import { ProgressBar } from './progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ProgressBar
    ],
    exports: [
        ProgressBar
    ]
})
export class ProgressBarModule { }