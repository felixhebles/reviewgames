import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { from, Observable, Observer } from 'rxjs';
import { Videojuego } from '../models/videojuego';
import { Usuario } from '../models/Usuario';


@Injectable()
export class RequestService implements OnInit {


  payload: any;
  isLoading = true;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  obtenerVideojuegos(): Observable<Videojuego[]> {

      return this.httpClient.get<Videojuego[]>('http://localhost:8080/videojuego/getVideojuegos');
  }

  createUser(password: string, usuario: string): Observable<any> {
    const formData  = new FormData();
    formData.append('usuario', usuario);
    formData.append('password', password);

    return from( 
  fetch(
    'http://localhost:8080/usuario/createUsuario',
    {
      body: formData,
      method: 'POST',
      mode: 'no-cors'
    }
  )
);

  }
  login(username: string, password: string): Observable<Usuario> {
    const formData  = new FormData();
    formData.append('usuario', username);
    formData.append('password', password);

    return this.httpClient.post<Usuario>('http://localhost:8080/usuario/login', formData);

  }



  // login(username: string) {
  //   const formData  = new FormData();
  //   formData.append('usuario', username);
  //   fetch(
  //     'http://localhost:8080/usuario/login',
  //     {
  //       body: formData,
  //       method: 'POST',
  //       mode: 'no-cors'
  //     }
  //   ).then(response => console.log(response))
  //   .catch(error => console.error(error))
  // }

}

