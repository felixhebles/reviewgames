import { Component, OnInit } from '@angular/core';
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

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.request.obtenerVideojuegos().subscribe( v => {
      this.lista = v;
      this.listaFiltrada = v;
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
}
