import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  });


  constructor(@Inject(DOCUMENT) private document: Document) { }
 

  ngOnInit(): void {
  }

  register(){

  }

}
