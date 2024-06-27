import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
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

  ngOnInit(): void {
    return;
  }

  // onSubmit() {
  //   if(this.loginForm.valid){
  //     this.authService.signIn(this.loginForm.get("email").value, this.loginForm.get("password").value)
  //     this.router.navigate(['/']);
  //   }
  // }

  async onSubmit() {
    if(this.loginForm.invalid) return;
    try {
      await this.authService.signIn(this.loginForm.get("email").value, this.loginForm.get("password").value);
      console.log('User signed in successfully');
      this.router.navigate(['/']); // Redirigir a la página de inicio después del inicio de sesión
    } catch (error) {
      console.error('Error signing in user:', error);
    }
  }
}
