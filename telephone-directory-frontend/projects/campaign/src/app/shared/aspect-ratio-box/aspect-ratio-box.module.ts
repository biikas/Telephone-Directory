import { NgModule } from '@angular/core';
import { AspectRatioComponent } from './aspect-ratio-box.component';

@NgModule({
    declarations: [
        AspectRatioComponent,
    ],
    exports: [
        AspectRatioComponent
    ]
})
export class AspectRatioBoxModule { }