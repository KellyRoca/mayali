import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    if(this.loginForm.valid){
      this.authService.login();
      this.router.navigate(['/']);
    }
    // const { username, password } = this.loginForm.value;
    // if (username === 'user' && password === 'password') {
    //   this.authService.login();
    //   this.router.navigate(['/']);
    // } else {
    //   this.loginError = true;
    // }
  }
}
