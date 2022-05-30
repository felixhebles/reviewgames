import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  });


  constructor(@Inject(DOCUMENT) private document: Document) { }


  ngOnInit(): void {

  }

  login() {
    console.log(this.formLogin.get('username')?.value);
    console.log(this.formLogin.get('password')?.value);
  }
}
