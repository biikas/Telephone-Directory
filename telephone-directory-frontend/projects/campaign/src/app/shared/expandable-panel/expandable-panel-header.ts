import { Directive } from '@angular/core';

@Directive({
    selector: 'expandable-panel-header',
    host: {
        class: 'expandable-panel__header'
    }
})
export class ExpandablePanelHeader { }