import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Videojuego } from '../models/videojuego';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lista:Videojuego[]=[];

  listaFiltrada:Videojuego[]=[];

  valorIntroducido: string = "";

  selected: boolean = false;

  videojuegoSelected!: Videojuego;

  usuario: string | null = null;

  constructor(private request: RequestService,
    private router: Router) { }

  ngOnInit(): void {
    this.request.obtenerVideojuegos().subscribe( v => {
      this.lista = v;
      this.listaFiltrada = v;
    });

    setTimeout(() => {
      this.usuario = localStorage.getItem('usuario');
    });
  }

  buscador() {
    setTimeout(() => {
      this.listaFiltrada = [];
      this.lista.forEach(el => {

        if (el.nombre.toLowerCase().includes(this.valorIntroducido.toLowerCase())) {
          this.listaFiltrada.push(el);
        }

      });
    });
    
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuario = null;
  }
}
