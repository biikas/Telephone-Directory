import { NgModule } from '@angular/core';
import { Dropdown } from './dropdown';
import { DropdownTrigger } from './dropdown-trigger';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { DropdownItem } from './dropdown-item';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        A11yModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        DropdownTrigger,
        DropdownItem,
        Dropdown,
    ],
    exports: [
        DropdownTrigger,
        DropdownItem,
        Dropdown,
    ]
})
export class DropdownModule { }