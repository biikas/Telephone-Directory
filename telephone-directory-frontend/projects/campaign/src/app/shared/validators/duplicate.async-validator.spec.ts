import { duplicateAsyncValidator } from './duplicate.async-validator';
import { AbstractControl, FormControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { of, Observable } from 'rxjs';

describe('Dublicate Asynchronous Validator', () => {
    let dublicateControl: AbstractControl;
    let uniqueControl: AbstractControl;
    let checker: (_: any) => Observable<boolean>;
    let asyncValidatorFn: AsyncValidatorFn;

    beforeAll(() => {
        dublicateControl = new FormControl('abc');
        uniqueControl = new FormControl('ab');
        checker = (value: any) => value === 'abc' ? of(true) : of(false);
        asyncValidatorFn = duplicateAsyncValidator(checker);
    });

    it('should return validation error when duplicate value is passed', () => {
        expect(asyncValidatorFn).toBeDefined();

        const asyncValidator = asyncValidatorFn(dublicateControl) as Observable<ValidationErrors | null>;
        asyncValidator.subscribe((error) => {
            expect(error).toEqual({ duplicate: true });
        });
    });

    it('should return null when unique value is passed', () => {
        expect(asyncValidatorFn).toBeDefined();

        const asyncValidator = asyncValidatorFn(uniqueControl) as Observable<ValidationErrors | null>;
        asyncValidator.subscribe((error) => {
            expect(error).toBeNull();
        });
    });
});