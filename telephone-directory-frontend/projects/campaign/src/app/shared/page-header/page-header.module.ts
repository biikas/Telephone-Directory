import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'nucleus';
import { IconModule } from '@shared/icon/index';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        ButtonModule
    ],
    declarations: [
        PageHeaderComponent
    ],
    exports: [
        PageHeaderComponent
    ]
})
export class PageHeaderModule {}