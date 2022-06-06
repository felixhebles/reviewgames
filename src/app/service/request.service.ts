import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Observer } from 'rxjs';
import { Videojuego } from '../models/videojuego';


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

}
