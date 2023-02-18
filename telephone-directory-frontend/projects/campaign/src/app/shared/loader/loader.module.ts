import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AspectRatioBoxModule } from '@shared/aspect-ratio-box/aspect-ratio-box.module';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { SectionLoader } from './section-loader/section-loader.component';

@NgModule({
    imports: [
        CommonModule,
        AspectRatioBoxModule,
    ],
    declarations: [
        SectionLoader,
        PageLoaderComponent,
    ],
    exports: [
        SectionLoader,
        PageLoaderComponent
    ]
})
export class LoaderModule { }