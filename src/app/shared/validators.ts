import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidUrlValidate(control: AbstractControl): ValidationErrors | null {
    const pattern = /^https?:\/\/.+/;
    return pattern.test(control.value) ? null : { validUrl: true };
}