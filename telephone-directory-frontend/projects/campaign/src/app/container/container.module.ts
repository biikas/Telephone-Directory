
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav';
import { SidebarComponent } from './sidebar';
import { FullContainer } from './full';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        MainNavComponent,
        SidebarComponent,
        ContainerComponent,
        FullContainer,
    ],
    exports: [
        MainNavComponent,
        SidebarComponent,
        ContainerComponent,
        FullContainer,
    ]
})
export class ContainerModule { }