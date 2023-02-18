import { Injectable } from '@angular/core';
import { ErrorMessages } from '@shared/error-messages';
import { NumberType } from './numeric.validator';

@Injectable({
    providedIn: 'root'
})
export class NumberErrorMessages extends ErrorMessages {

    number(name: string, params: any) {
        if (params.type === NumberType.NATURAL) {
            return `${name} must be number only. `;
        } else {
            return `${name} must be number only. `;
        }
    }
}
