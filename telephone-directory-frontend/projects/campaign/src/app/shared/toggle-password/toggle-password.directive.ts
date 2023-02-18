import { ComponentFactoryResolver, ComponentRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { TogglePasswordComponent } from './toggle-password.component';

@Directive({
    selector: '[togglePassword]',
})
export class TogglePasswordDirective implements OnInit {
    private container: ComponentRef<TogglePasswordComponent>;

    constructor(
        private template: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        const containerFactory = this.componentFactoryResolver.resolveComponentFactory(TogglePasswordComponent);
        this.container = this.viewContainer.createComponent(containerFactory);
        this.container.instance.template = this.template;
    }
}