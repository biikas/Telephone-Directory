import {
    Component,
    TemplateRef,
    ViewChild,
    ContentChildren,
    QueryList,
    ElementRef,
    OnDestroy,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { DropdownItem } from './dropdown-item';
import { FocusKeyManager, FocusOrigin, FocusMonitor } from '@angular/cdk/a11y';
import { slideInOut } from '@shared/animations';

@Component({
    selector: 'dropdown-menu',
    templateUrl: './dropdown.html',
    animations: [
        slideInOut
    ]
})
export class Dropdown implements OnDestroy {
    @ViewChild(TemplateRef, { static: false })
    menu: TemplateRef<any>;

    @ContentChildren(DropdownItem, { descendants: true })
    items: QueryList<DropdownItem>;

    modifier = '';

    @Input()
    set size(value: string) {
        if (value) {
            this.modifier = `dropdown--${value}`;
        } else {
            this.modifier = '';
        }
    }
    get size() {
        return this.modifier;
    }

    @Output()
    opened = new EventEmitter();

    @Output()
    closed = new EventEmitter();

    private keyManager: FocusKeyManager<DropdownItem>;
    private origin: FocusOrigin;

    constructor(
        private elementRef: ElementRef,
        private focusMonitor: FocusMonitor
    ) {
        this.focusMonitor.monitor(elementRef, true).subscribe((origin) => {
            this.origin = origin;
        });
    }

    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    open() {
        if (!this.items.length) {
            return;
        }
        this.keyManager = new FocusKeyManager(this.items).withWrap();
        if (this.origin === 'program') {
            this.keyManager.setFirstItemActive();
        }
    }

    next() {
        this.keyManager.setNextItemActive();
    }

    previous() {
        this.keyManager.setPreviousItemActive();
    }
}