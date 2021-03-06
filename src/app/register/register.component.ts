import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../service/request.service';

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


  constructor(@Inject(DOCUMENT) private document: Document,
  private request: RequestService,
  private router: Router) { }
 

  ngOnInit(): void {
  }

  //Método que se encarga de la funcionalidad de registro.
  register(){
    if (this.formRegister.get('username')?.value && this.formRegister.get('password')?.value) {
      const usuario = {
        password: this.formRegister.get('password')?.value,
        usuario: this.formRegister.get('username')?.value
      }
      this.request.createUser(this.formRegister.get('password')?.value,
        this.formRegister.get('username')?.value).subscribe( v => {
          this.request.login(this.formRegister.get('username')?.value, this.formRegister.get('password')?.value).subscribe(
            {
              next: (res) => {
                localStorage.setItem('usuario', res.usuario);
                localStorage.setItem('idUsuario', `${res.idUsuario}`);
                this.router.navigate(['/home']);
              },
              error: (err) => {
              }
           });
        });
    }

  }

}
