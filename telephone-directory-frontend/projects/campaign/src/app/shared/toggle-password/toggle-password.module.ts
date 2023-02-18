import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon';
import { TogglePasswordComponent } from './toggle-password.component';
import { TogglePasswordDirective } from './toggle-password.directive';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
    ],
    declarations: [
        TogglePasswordComponent,
        TogglePasswordDirective,
    ],
    exports: [
        TogglePasswordDirective
    ],
    entryComponents: [
        TogglePasswordComponent
    ],
})
export class TogglePasswordModule { }