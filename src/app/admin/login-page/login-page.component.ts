import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message;
  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) { }
  minLength  = 6;
  validationErrors = {
    email: [
      { type: 'required', message: 'Введите поле email'},
      { type: 'email', message: '  Введите корректный email'}
      ],
    password: [
      { type: 'required', message: 'Введите пароль'},
      { type: 'minlength', message: `Пароль должен быть не менее ${this.minLength} символов.` }
    ]
};
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params[`loginAgain`]) {
        this.message = 'Введите данные';
      } else if (params[`authFailed`]) {
        this.message = 'Ссессия истекла. Введите данные заново';
      }
    });
    this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
      }
    );
  }

  submit() {
    console.log(this.form.valid);
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      });
  }
}
