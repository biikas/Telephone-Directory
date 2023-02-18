import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppConstants {
    static readonly SESSION = {
        AUTHORIZATION: 'Authorization'
    };
    APP_NAME = 'Telephone Directory';

    ASSETS = {
        APP_LOGO: this.setAssets('brand/logos-brand-color.svg'),
        BRAND_SM: this.setAssets('brand/logos-brand-icon-primary.svg')
    };

    ILLUSTRATIONS = {
        UPLOAD_IMAGE: {
            src: this.setAssets('illustrations/image-add@2x.png'),
            alt: 'Add a file',
            srcset:
                this.setAssets('illustrations/image-add@3x.png') + ' 3x,' +
                this.setAssets('illustrations/image-add@2x.png') + ' 2x,' +
                this.setAssets('illustrations/image-add.png') + ' 1x'
        },
        EMPTY_FOLDER: {
            src: this.setAssets('illustrations/illustrations-custom-empty-folder@2x.png'),
            alt: 'No records found',
            srcset:
                this.setAssets('illustrations/illustrations-custom-empty-folder@3x.png') + ' 3x,' +
                this.setAssets('illustrations/illustrations-custom-empty-folder@2x.png') + ' 2x,' +
                this.setAssets('illustrations/illustrations-custom-empty-folder.png') + ' 1x'
        },
        UPLOAD_FILE: {
            src: this.setAssets('illustrations/illustrations-custom-empty-folder@2x.png'),
            alt: 'Upload file',
            srcset:
                this.setAssets('illustrations/illustrations-custom-empty-folder@3x.png') + ' 3x,' +
                this.setAssets('illustrations/illustrations-custom-empty-folder@2x.png') + ' 2x,' +
                this.setAssets('illustrations/illustrations-custom-empty-folder.png') + ' 1x'
        },
        XLS_FILE: {
            src: this.setAssets('illustrations/xls-file-format.png'),
            alt: 'XLS file',
        }
    };

    setAssets(name: string) {
        return `assets/${name}`;
    }
}
