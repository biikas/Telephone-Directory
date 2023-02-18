
import { CdkPortal, Portal } from '@angular/cdk/portal';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

let uniqueId = 0;

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    host: {
        '[attr.id]': 'id'
    },
    exportAs: 'tab'
})
export class TabComponent {
    @Input()
    name: string;

    @Input()
    tabIcon: string;

    @Input()
    active: boolean;

    id = `tab-${uniqueId++}`;

    @ViewChild(CdkPortal, { static: true })
    portal: Portal<any>;
}