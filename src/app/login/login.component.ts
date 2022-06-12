import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../service/request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });


  constructor(@Inject(DOCUMENT) private document: Document,
  private request: RequestService,
  private router: Router) { }


  ngOnInit(): void {

  }

  login() {
  //   this.request.login(this.formLogin.get('username')?.value).subscribe({
  //     next: (v) => {
  //       console.log('next', v);
  //     },
  //     error: (e) => {
  //       console.log('error', e);
  //     }
  // });

  this.request.login(this.formLogin.get('username')?.value, this.formLogin.get('password')?.value).subscribe(
    {
      next: (res) => {
        localStorage.setItem('usuario', res.usuario);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.formLogin.markAllAsTouched();
      }
   });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
