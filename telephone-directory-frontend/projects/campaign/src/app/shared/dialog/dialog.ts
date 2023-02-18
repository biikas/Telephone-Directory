import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { DialogContainer } from './dialog-container';

@Injectable()
export class Dialog {
    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
    ) { }

    show<T>(templateRef: TemplateRef<T>, config?: {
        viewContainerRef: ViewContainerRef,
        injector?: Injector,
        componentFactoryResolver?: ComponentFactoryResolver
        context?: any,
        panelClassName?: string
    }) {
        this.overlayRef = this.overlay.create({
            panelClass: config.panelClassName || '',
            hasBackdrop: true,
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically(),

        });
        this.overlayRef.backdropClick().subscribe(() => this.hide());
        this.overlayRef.keydownEvents().subscribe((event) => {
            // tslint:disable-next-line
            if (event.keyCode == ESCAPE) {
                event.preventDefault();
                this.hide();
            }
        });
        const portal = new ComponentPortal(
            DialogContainer,
            config.viewContainerRef,
            config.injector,
            config.componentFactoryResolver);
        const containerRef = this.overlayRef.attach(portal);
        containerRef.instance.attachTemplatePortal(
            new TemplatePortal(templateRef, config.viewContainerRef, config.context)
        );
    }

    hide() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}