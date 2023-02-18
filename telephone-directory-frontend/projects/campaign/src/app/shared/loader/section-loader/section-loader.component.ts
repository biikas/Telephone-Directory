import { Directive, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Directive({
    selector: '[sectionLoader]',
})
export class SectionLoader {
    @HostBinding('class.is-loading')
    isLoading = true;

    @Input()
    set sectionLoader(value: boolean) {
        this.isLoading = value;
    }
}