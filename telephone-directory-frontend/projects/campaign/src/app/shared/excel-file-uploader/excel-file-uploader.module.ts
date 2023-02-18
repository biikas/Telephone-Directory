import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AspectRatioBoxModule } from "@shared/aspect-ratio-box/aspect-ratio-box.module";
import { IconModule } from "@shared/icon";
import { ProgressBarModule } from "@shared/progress-bar/progress-bar.module";
import { NgxUploaderModule } from "ngx-uploader";
import { ButtonModule } from "nucleus";

@NgModule({
    imports: [
        CommonModule,
        ProgressBarModule,
        NgxUploaderModule,
        AspectRatioBoxModule,
        ButtonModule,
        IconModule,
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class ExcelFileUploaderModule { }