import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  newUser: User;
  loginForm: FormGroup;

  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
  }

  login(formData) {
    this.newUser = formData.value;
    this.authService.loginService(this.newUser);

    Swal.fire({
      icon: 'success',
      title: 'Login',
      text: `Welcome ${this.newUser.username}, enjoy!`
    });

    this.router.navigate(['/dashboard']);
  }

}
