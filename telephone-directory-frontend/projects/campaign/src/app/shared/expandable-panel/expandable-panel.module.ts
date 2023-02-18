import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'nucleus';
import { ExpandablePanel } from './expandable-panel';
import { ExpandablePanelHeader } from './expandable-panel-header';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        ExpandablePanel,
        ExpandablePanelHeader,
    ],
    exports: [
        ExpandablePanel,
        ExpandablePanelHeader,
    ],
})

export class ExpandablePanelModule { }