import { Component } from '@angular/core';

enum PanelExpansionType {
    EXPAND = 'Expand',
    CLOSE = 'Close'
}

@Component({
    selector: 'expandable-panel',
    templateUrl: './expandable-panel.html',
    host: {
        class: 'expandable-panel'
    }
})
export class ExpandablePanel {
    isShown = false;
    type = PanelExpansionType.EXPAND;

    toggle() {
        this.isShown = !this.isShown;
        this.type = this.isShown ? PanelExpansionType.CLOSE : PanelExpansionType.EXPAND;
    }
}