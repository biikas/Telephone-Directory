import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@shared/icon';
import { InputModule } from 'nucleus';
import { Timepicker } from './timepicker';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        InputModule,
        FormsModule,
    ],
    declarations: [
        Timepicker
    ],
    exports: [
        Timepicker
    ]
})
export class TimepickerModule { }