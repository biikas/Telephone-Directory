import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonModule } from 'nucleus';
import { IconModule } from '../icon';
import { PaginationComponent } from './pagination';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        IconModule,
        FormsModule,
        NgSelectModule
    ],
    declarations: [
        PaginationComponent,
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule { }