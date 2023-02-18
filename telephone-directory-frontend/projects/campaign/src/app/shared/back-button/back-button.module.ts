import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon';
import { BackButtonComponent } from './back-button.component';

@NgModule({
    declarations: [
        BackButtonComponent,
    ],
    imports: [
        CommonModule,
        IconModule
    ],
    exports: [
        BackButtonComponent
    ]
})
export class BackButtonModule { }