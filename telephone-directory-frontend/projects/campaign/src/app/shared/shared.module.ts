import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectConfig, NgSelectModule, ɵs } from '@ng-select/ng-select';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import {
    ButtonModule,
    CheckboxModule,
    ErrorMessageBuilder,
    FormFieldModule,
    InputModule,
    RadioModule,
    TextareaModule
} from 'nucleus';
import { AlertModule } from './alert';
import { AspectRatioBoxModule } from './aspect-ratio-box/aspect-ratio-box.module';
import { AvatarModule } from './avatar';
import { BackButtonModule } from './back-button';
import { DialogModule } from './dialog';
import { DropdownModule } from './dropdown';
import { ErrorMessages } from './error-messages';
import { ExpandablePanelModule } from './expandable-panel/expandable-panel.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FormControlWrapper } from './form-control-wrapper';
import { FormFieldBuilder } from './form-field-builder';
import { IconModule } from './icon';
import { LoaderModule } from './loader/loader.module';
import { OtpFieldModule } from './otp-field';
import { OtpComponent } from './otp/otp.component';
import { PageHeaderModule } from './page-header/index';
import { PaginationModule } from './pagination';
import { StepperModule } from './stepper';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { TabsModule } from './tabs';
import { TimepickerModule } from './timepicker/timepicker.module';
import { TogglePasswordModule } from './toggle-password/toggle-password.module';
import { UppercaseDirective } from './upper-case/upper-case-directive';
import { ValidateAndSubmit } from './validate-and-submit';
import { ExcelFileUploaderModule } from './excel-file-uploader/excel-file-uploader.module';

const NG_SELECT_CONFIG: Partial<NgSelectConfig> = {
    appendTo: 'body',
};

const DATEPICKER_CONFIG: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-default',
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        ButtonModule,
        InputModule,
        TextareaModule,
        CheckboxModule.forRoot(),
        RadioModule.forRoot(),
        FormFieldModule.forRoot(),
        IconModule,
        DropdownModule,
        DialogModule,
        AlertModule,
        PaginationModule,
        AvatarModule,
        PageHeaderModule,
        OtpFieldModule,
        StepperModule,
        BackButtonModule,
        ExpandablePanelModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        QuillModule.forRoot(),
        LoaderModule,
    ],
    declarations: [
        ValidateAndSubmit,
        UppercaseDirective,
        OtpComponent,
        FormControlWrapper,
        FormFieldBuilder,
        SwitchButtonComponent,
    ],
    providers: [
        {
            provide: ErrorMessageBuilder,
            useClass: ErrorMessages
        },
        {
            provide: NgSelectConfig,
            useValue: NG_SELECT_CONFIG,
        },
        {
            provide: ɵs
        },
        {
            provide: BsDatepickerConfig,
            useValue: DATEPICKER_CONFIG
        },
    ],
    exports: [
        CommonModule,
        FormsModule,
        QuillModule,
        ReactiveFormsModule,
        ModalModule,
        ButtonModule,
        InputModule,
        TextareaModule,
        CheckboxModule,
        RadioModule,
        TabsModule,
        FormFieldModule,
        TogglePasswordModule,
        ValidateAndSubmit,
        IconModule,
        DropdownModule,
        DialogModule,
        AlertModule,
        PaginationModule,
        AvatarModule,
        PageHeaderModule,
        OtpFieldModule,
        OtpComponent,
        UppercaseDirective,
        StepperModule,
        BackButtonModule,
        ExpandablePanelModule,
        NgSelectModule,
        FormControlWrapper,
        FormFieldBuilder,
        SwitchButtonComponent,
        BsDatepickerModule,
        TimepickerModule,
        AspectRatioBoxModule,
        FileUploaderModule,
        LoaderModule,
        ExcelFileUploaderModule,
    ],
})
export class SharedModule { }