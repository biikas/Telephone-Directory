
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, Input, ViewChild } from '@angular/core';

let uniqueId = 0;

@Component({
    selector: 'dialog-container',
    templateUrl: './dialog-container.html',
    host: {
        role: 'dialog',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': 'id',
        class: 'dialog'
    }
})
export class DialogContainer extends BasePortalOutlet {
    // public shouldShowHeader: boolean;
    // @Input()
    // title: string;
    // @Input()
    // set showHeader(shouldShowHeader: boolean) {
    //     this.shouldShowHeader = shouldShowHeader;
    // }

    // get showHeader() {
    //     return this.shouldShowHeader;
    // }

    id = `dialog-${uniqueId++}`;

    @ViewChild(CdkPortalOutlet, { static: true })
    portal: CdkPortalOutlet;

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        return this.portal.attachComponentPortal(portal);
    }

    attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
        return this.portal.attachTemplatePortal(portal);
    }
}
