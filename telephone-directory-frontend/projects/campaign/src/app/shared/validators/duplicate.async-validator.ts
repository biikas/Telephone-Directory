import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function duplicateAsyncValidator(checker: (_: any) => Observable<boolean>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return checker(control.value).pipe(
            map((status) => {
                return status ? { duplicate: true } : null;
            })
        );
    };
}