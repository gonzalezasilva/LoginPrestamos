import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@app/services/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  hide = true;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    // redirige al Inicio si ya está logeado
    if (this.authenticationService.currentUserValue.token != undefined) {
      this.router.navigate([this.returnUrl]);
    }
  }
  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(estado: { username: string, password: string }) {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    this.loading = true;

    this.authenticationService.login(estado.username, estado.password)
      .pipe(first()).subscribe({
        next: (v) => {
          console.log(v);
          if (this.returnUrl=='/') {this.returnUrl='people'};
          this.router.navigate([this.returnUrl]);
        },
        error: (e) => {
          this.error = e;
          this.loading = false;
        },
        complete: () => console.info('complete')
      });
  }

  getErrorMessage() {
    if (this.f["username"].hasError('required')  && (this.f["username"].dirty || this.f["username"].touched)) {
      return 'Nombre de usuario incorrecto';
    }
    if (this.f["password"].hasError('required')&& (this.f["password"].dirty || this.f["password"].touched)) {
      return 'Contraseña incorrecta';
    }
    return ''

  }
}