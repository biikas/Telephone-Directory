
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { Dialog } from './dialog';
import { DialogContainer } from './dialog-container';
import { PortalModule } from '@angular/cdk/portal';
import { DialogHeaderComponent } from '../dialog/dialog-header/dialog-header.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '@shared/icon';
import { ButtonModule } from 'nucleus';

@NgModule({
    imports: [
        OverlayModule,
        PortalModule,
        A11yModule,
        CommonModule,
        IconModule,
        ButtonModule
    ],
    declarations: [
        DialogContainer,
        DialogHeaderComponent
    ],
    providers: [
        Dialog
    ],
    exports: [
        DialogContainer,
        DialogHeaderComponent
    ],
    entryComponents: [
        DialogContainer,
    ]
})
export class DialogModule { }