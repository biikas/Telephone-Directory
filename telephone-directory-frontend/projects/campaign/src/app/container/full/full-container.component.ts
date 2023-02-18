import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'full-container',
    templateUrl: './full-container.component.html',
    host: {
        class: 'full-container'
    }
})
export class FullContainer { }