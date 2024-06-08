import { AbstractControl, ValidatorFn } from '@angular/forms';

export class AllowLetter{
  static  lettersOnlyValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const forbidden = /[^a-zA-Z]/.test(control.value);
          return forbidden ? { 'lettersOnly': { value: control.value } } : null;
        }
}
}