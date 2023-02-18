import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lessEqualValidator(...names: string[]): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const length = Object.keys(group.controls).length;
    if (length > 1) {
      const values = names.map((name) => group.controls[name].value);
      if (!isNumber(values[0])) {
          return;
      }
      if (!isNumber(values[1])) {
          return;
      }
      return Number(values[0]) <= Number(values[1]) ? null : { lessEqual: true };
    }
    return null;
  };
}

function isNumber(value: string | number): boolean {
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}
