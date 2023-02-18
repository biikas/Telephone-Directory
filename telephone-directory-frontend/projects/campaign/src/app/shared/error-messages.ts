import { Injectable } from '@angular/core';
import { ErrorMessageBuilder } from 'nucleus/form/form-field';
import { NumberType } from './validators/numeric.validator';

@Injectable()
export class ErrorMessages extends ErrorMessageBuilder {
    required(name: string) {
        return `${name} is required.`;
    }

    minlength(name: string, params: { requiredLength: number }) {
        return `Must be at least ${params.requiredLength} characters long.`;
    }

    maxlength(name: string, params: { requiredLength: number }) {
        return `Must be at most ${params.requiredLength} characters long.`;
    }

    min(name: string, params: any) {
        return `Must be at least ${params.min}.`;
    }
    max(name: string, params: any) {
        return `Must be at most ${params.max}.`;
    }

    alphaNumeric(name: string, params: any) {
        return `${name} must contain alphanumeric character` + (params.space && `and single space only.` || '');
    }

    alpha(name: string) {
        return `${name} must be alphabets only.`;
    }

    phoneNumber(name: string) {
        return `Invalid ${name}.`;
    }

    integer(name: string, params: any) {
        return `Invalid ${name}.`;
    }

    server(name: string, params: any) {
        return `${name} ${params}.`;
    }

    email(name: string) {
        return `Invalid ${name} address.`;
    }

    pattern(name: string) {
        return `${name} must not be script.`;
    }

    equal(name: string, params: any) {
        return `${params.field} and ${name} must be the same.`;
    }

    name(name: string) {
        return `${name} must be name of a person.`;
    }

    number(name: string, params: any) {
        if (params.type === NumberType.NATURAL) {
            return `${name} must be number only without decimal. `;
        } else {
            return `${name} must be greater than 1 and number only. `;
        }
    }

    multipleMobileNumber(name: string) {
        return `Invalid ${name}.`;
    }

    merchantCode(name: string) {
        return `${name} must contain alphanumeric and underscore only. `;
    }
}