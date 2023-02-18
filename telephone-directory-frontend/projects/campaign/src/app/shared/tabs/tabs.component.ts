import { Portal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    Renderer2
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    host: {
        class: 'tabs'
    },
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent)
    tabs: QueryList<TabComponent>;

    @Input() alignCenter = false;

    @Input()
    set size(value: string) {
        if (value) {
            this.renderer.addClass(this.elRef.nativeElement.firstElementChild, `tabs__list--${value}`);
        } else {
            this.renderer.removeClass(this.elRef.nativeElement.firstElementChild, `tabs__list--${value}`);
        }
    }

    @Output()
    change = new EventEmitter<string>();

    activePortal: Portal<any>;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngAfterContentInit() {
        const currentTab = this.tabs.find((tab) => tab.active) || this.tabs.first;
        this.selectTab(currentTab);
    }

    selectTab(currentTab: TabComponent) {
        this.tabs.forEach((tab) => tab.active = false);
        currentTab.active = true;
        this.activePortal = currentTab.portal;
        this.changeDetectorRef.detectChanges();
        this.change.emit(currentTab.name);
    }

    reset() {
        this.selectTab(this.tabs.first);
    }
}