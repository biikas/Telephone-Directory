import {
    DecimalValidator,
    PhoneNumberValidator,
    IntegerNumberValidator
} from 'nucleus';
import { urlValidator } from './url.validator';
import { duplicateAsyncValidator } from './duplicate.async-validator';
import { equalValidator } from './equal.validator';
import { alphaValidator } from './alpha.validator';
import { scriptValidator } from './script.validator';
import { emailValidator } from './email.validator';
import { nameValidator } from './name.validator';
import { numericValidator } from './numeric.validator';
import { alphaNumbericValidator } from './alphanumeric.validator.';
import { lessEqualValidator } from './lessEqual.validator';
import { multipleMobileNumberValidator } from './multiple-mobile-number.validators';
import { merchantNameValidator } from './merchantName.validator.';
import { merchantCodeValidator } from './merchantCode.validator';

export class CustomValidators {
    static alpha = alphaValidator;
    static personName = nameValidator;
    static email = emailValidator;
    static alphaNumeric = alphaNumbericValidator;
    static decimal = DecimalValidator;
    static phoneNumber = PhoneNumberValidator;
    static integer = IntegerNumberValidator;
    static url = urlValidator;
    static duplicateAsync = duplicateAsyncValidator;
    static equal = equalValidator;
    static lessEqual = lessEqualValidator;
    static number = numericValidator;
    static script = scriptValidator;
    static multipleNumber = multipleMobileNumberValidator;
    static merchantName = merchantNameValidator;
    static merchantCode = merchantCodeValidator;
}