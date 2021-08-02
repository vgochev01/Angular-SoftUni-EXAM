import { AbstractControl } from "@angular/forms";

export const passwordsMatchValidation = (control: AbstractControl) => {
  const pass = control.get('password');
  const repass = control.get('repeatPassword');
  if(pass && repass && (pass.value != repass.value)) {
    repass.setErrors({ passDontMatch: true });
  } else {
    repass?.setErrors(null);
  }
}