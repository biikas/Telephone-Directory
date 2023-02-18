import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from './icon.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        Icon
    ],
    exports: [
        Icon
    ],
    entryComponents: [
        Icon
    ]
})
export class IconModule { }