import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";

export function passMatchingFactory(getPassControl: () => AbstractControl | null){
  let subscription: Subscription | null = null;
  return (control: AbstractControl): ValidationErrors | null => {
    const passControl = getPassControl();
    if(!passControl) { return null; }
    subscription = passControl.valueChanges.subscribe({
      next: () => {
        control.updateValueAndValidity();
      },
      complete: () => {
        subscription?.unsubscribe();
        subscription = null;
      }
    })
    const passValue = passControl.value;
    const repassValue = control.value;
    return passValue == repassValue ? null : { passMatch: true };
  }
}