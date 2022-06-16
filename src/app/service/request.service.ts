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


  obtenerComentarios(idVideojuego: Number) {
    const formData  = new FormData();
    formData.append('idVideojuego', `${idVideojuego}`);

    return this.httpClient.post<any[]>('http://localhost:8080/comentario/getComentario', formData);
  }

  createComentarios(comentario: any) {
    const formData  = new FormData();
    formData.append('descripcion', `${comentario.descripcion}`);
    formData.append('idUsuario', `${comentario.idUsuario}`);
    formData.append('idVideojuego', `${comentario.idVideojuego}`);

    return this.httpClient.post<any>('http://localhost:8080/comentario/createComentario', formData);
  }

  deleteComentario(comentario: any) {
    const formData  = new FormData();
    formData.append('idComentario', `${comentario.idComentario}`);

    return this.httpClient.post<any>('http://localhost:8080/comentario/deleteComentario', formData);
  }

  obtenerVideojuegos(): Observable<Videojuego[]> {

    return this.httpClient.get<Videojuego[]>('http://localhost:8080/videojuego/getVideojuegos');
}

  obtenerVotos(idVideojuego: Number) {
    const formData  = new FormData();
    formData.append('idVideojuego', `${idVideojuego}`);

    return this.httpClient.post<any>('http://localhost:8080/votacion/getVotacion', formData);
  }

  createVotos(votacion: any) {
    const formData  = new FormData();
    formData.append('votacion', `${votacion.votacion}`);
    formData.append('idUsuario', `${votacion.idUsuario}`);
    formData.append('idVideojuego', `${votacion.idVideojuego}`);

    return this.httpClient.post<any>('http://localhost:8080/votacion/addVotacion', formData);
  }
}

