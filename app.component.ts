import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl
 } from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  user : FormGroup;
  constructor(private fb: FormBuilder) {}
ngOnInit() {
    this.user = this.fb.group({
      password: ['', Validators.required],
        confirmPass: ['', Validators.required],
        oldpassword: ['', Validators.required],
    }, { validator: emailMatcher });
  }


}
export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const password = control.get('password');
  const confirm = control.get('confirmPass');
  const oldpassword = control.get('oldpassword');
console.log('Old Pass Word Value::'+oldpassword.value);

  if (!password || !confirm ||!oldpassword ) return null;
  if(oldpassword.value === password.value && password.value !== confirm.value)
  return {nomatch: true, oldNewMatch: true};
  else if(!(password.value === confirm.value))
  return  { nomatch: true };
  if(oldpassword.value === password.value) {
console.log('Old and New Matched');
 return {oldNewMatch: true}
  }
  
 
};
