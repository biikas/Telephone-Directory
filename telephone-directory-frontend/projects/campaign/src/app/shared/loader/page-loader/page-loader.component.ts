import { Component, Input } from '@angular/core';
import { AppConstants } from '@core/constants';

@Component({
    selector: 'page-loader',
    templateUrl: './page-loader.component.html',
})
export class PageLoaderComponent {
    loaderText = 'Please Wait';

    @Input() showLoader: boolean;

    @Input() set text(value: string) {
        if (value) {
            this.loaderText = value;
        }
    }

    constructor(
        private appConstants: AppConstants
    ) { }
}