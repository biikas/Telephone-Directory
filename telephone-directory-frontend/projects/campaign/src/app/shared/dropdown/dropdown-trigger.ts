import { DOWN_ARROW, ESCAPE, hasModifierKey, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, ViewContainerRef, OnDestroy, Renderer2, Input } from '@angular/core';
import { Dropdown } from './dropdown';

@Directive({
    selector: '[dropdownTrigger]',
    host: {
        role: 'button',
        'aria-hasPopup': 'menu',
        '[attr.aria-expandeded]': 'isOpen'
    },
    exportAs: 'dropdown'
})
export class DropdownTrigger implements OnDestroy {
    overlayRef: OverlayRef;
    isOpen = null;
    isOnHover: boolean;

    @Input() set triggerOnHover(value: boolean) {
        if (value) {
            this.isOnHover = value;
        }
    }
    get triggerOnHover() {
        return this.isOnHover;
    }

    private el: EventTarget;

    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private elementRef: ElementRef,
        private dropdown: Dropdown,
    ) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOnHover) {
            this.show();
        }

    }
    @HostListener('mouseenter', ['$event'])
    onMouseOver(event: Event) {
        if (this.isOnHover) {
            if (!this.el) {
                this.el = event.target;
                this.show();
            }
        }
    }
    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: Event) {
        if (this.isOnHover) {
            if (this.el === event.target) {
                this.el = null;
                this.hide();
            }
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        // tslint:disable-next-line
        if (event.keyCode === SPACE && !hasModifierKey(event)) {
            event.preventDefault();
            this.show();
        }
    }

    show() {
        const portal = new TemplatePortal(this.dropdown.menu, this.viewContainerRef);
        this.overlayRef = this.overlay.create({
            hasBackdrop: !this.isOnHover,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disposeOnNavigation: true,
            panelClass: 'dropdown-container',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withPositions([
                    {
                        originX: 'end',
                        originY: this.isOnHover ? 'center' : 'bottom',
                        overlayX: this.isOnHover ? 'start' : 'end',
                        overlayY: this.isOnHover ? 'center' : 'top',
                        panelClass: this.isOnHover ? 'hide' : ''
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                        panelClass: 'down'
                    }
                ])
        });
        this.overlayRef.backdropClick().subscribe(() => {
            this.hide();
        });
        this.overlayRef.keydownEvents().subscribe((event) => {
            // tslint:disable-next-line
            switch (event.keyCode) {
                case ESCAPE:
                case TAB:
                    event.preventDefault();
                    this.hide();
                    break;
                case DOWN_ARROW:
                    event.preventDefault();
                    this.dropdown.next();
                    break;
                case UP_ARROW:
                    event.preventDefault();
                    this.dropdown.previous();
                    break;
            }
        });
        this.overlayRef.attach(portal);
        this.dropdown.items.forEach((item) => {
            item.clicked.subscribe(() => {
                this.hide();
            });
        });
        this.isOpen = true;
        this.dropdown.open();
        this.dropdown.opened.emit();
    }

    hide() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        if (this.elementRef) {
            this.elementRef.nativeElement.focus();
        }
        this.isOpen = null;
        this.dropdown.closed.emit();
    }

    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        this.isOpen = null;
    }
}