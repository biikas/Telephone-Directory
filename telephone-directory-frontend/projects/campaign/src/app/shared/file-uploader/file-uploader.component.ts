import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppConstants } from '@core/constants';
import { AlertService } from '@shared/alert';
import { UploaderOptions, UploadInput, UploadOutput } from 'ngx-uploader';
import { MessageType } from 'nucleus';
import { of } from 'rxjs';
import { delay, distinctUntilChanged } from 'rxjs/operators';

export interface UploaderFile {
  file?: File;
  name: string;
  progress?: string;
  id?: string;
  src?: SafeUrl;
  status?: 'PENDING' | 'UPLOADED' | 'REMOVED';
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  host: {
    class: 'uploader',
    '[class.dragged-over]': 'draggedOver'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent {

  files: UploaderFile[] = [];
  draggedOver = false;
  uploadInput = new EventEmitter<UploadInput>();
  titleMessage = 'Upload your file';
  infoMessage = 'Upload your file';
  showUploadWindow = true;

  @Input()
  progress?: UploaderFile[] = [];

  @Input()
  invalidFileEvent?: UploadInput;

  // @Input()
  // set invalidFileEvent(fileEvent : UploadInput) {
  //   console.log("invalid file event occured", fileEvent);
  //   if(fileEvent.type === 'remove') {
  //     console.log("invalid file event occured");
  //     console.log(this.files);
  //     this.files = [];
  //   }
  // }
  @Input()
  options: UploaderOptions = {
    concurrency: 1,
  };

  @Output()
  updatedFiles = new EventEmitter<UploaderFile[]>();

  @Input()
  set title(title: string) {
    if (title) {
      this.titleMessage = title;
    }
  }

  @Input()
  set fileInfoMessage(message: string) {
    if (message) {
      this.infoMessage = message;
    }
  }

  @Input()
  set showUpload(show: boolean) {
    if (show) {
      this.showUploadWindow = true;
    } else {
      this.showUploadWindow = false;
    }
  }

  @Input()
  showAttachment: boolean;

  @Output()
  uploadedFileSuccessInfo = new EventEmitter();

  @Input()
  showInitialView = true;

  @Input()
  source: string;

  constructor(
    public appConstants: AppConstants,
    private domSanitizer: DomSanitizer,
    private alert: AlertService,
  ) { }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'addedToQueue':
        this.files.push({
          file: output.file.nativeFile,
          name: output.file.name,
          src: this.excelFileSrc(output.file.nativeFile),
          id: output.file.id,
          status: 'PENDING',
        });
        this.updatedFiles.emit(this.files);
        this.showUploadWindow = false;
        break;
      case 'dragOver':
        this.updateDraggedOver(true).subscribe(() => {
          this.draggedOver = true;
        });
        break;
      case 'dragOut':
      case 'drop':
        this.updateDraggedOver(false).subscribe(() => {
          this.draggedOver = false;
        });
        break;
      case 'rejected':
        let message = '';
        if (!this.options.allowedContentTypes.includes(output.file.type)) {
          message = `File must be of .xlsx or .xls format`;
        } else if (this.options.maxFileSize < output.file.size) {
          message = `File must not exceed ${(this.options.maxFileSize / (1024 * 1024)).toFixed(2)}MB`;
        } else if (this.options.maxUploads === this.files.length) {
          message = `Please upload ${this.options.maxUploads} file only.`;
        }
        this.alert.open({
          type: MessageType.ERROR,
          message
        });

    }
  }

  removeFile(index: number): void {
    this.uploadInput.emit({ type: 'remove', id: this.files[index].id });
    this.files.splice(index, 1);
    this.progress.splice(index, 1);
    this.showUploadWindow = true;
    this.updatedFiles.emit(this.files);
  }

  updateDraggedOver(value: boolean) {
    return of(value).pipe(
      delay(300),
      distinctUntilChanged()
    );
  }

  private excelFileSrc(file: File) {
    const url = window.URL.createObjectURL(file);
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
