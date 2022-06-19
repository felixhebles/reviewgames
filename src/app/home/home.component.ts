import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
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

  idUsuario: string | null = null;

  comentarios: any[] = [];

  comentario = '';

  voto = 0;

  msg: string | null = null;

  constructor(private request: RequestService,
    private router: Router) { }

  ngOnInit(): void {
    this.request.obtenerVideojuegos().subscribe( v => {
      this.lista = v;
      this.listaFiltrada = v;
    });

    setTimeout(() => {
      this.usuario = localStorage.getItem('usuario');
      this.idUsuario = localStorage.getItem('idUsuario');
    });
  }

  //Se encarga de la barra buscadora de videojuegos.
  buscador() {
    setTimeout(() => {
      this.listaFiltrada = [];
      this.lista.forEach(el => {

        if (el.nombre.toLowerCase().includes(this.valorIntroducido.toLowerCase())) {
          this.listaFiltrada.push(el);
        }

      });

      if (this.listaFiltrada.length === 0) {
        this.msg = 'No se han encontrado resultados';
      } else {
        this.msg = null;
      }
    });
    
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  //Opción que se encarga de cerrar la sesión del usuario.
  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('idUsuario');
    this.usuario = null;
    this.idUsuario = null;
  }

  //Se encarga de seleccionar el videojuego
  videojuegoSeleccionado(item: Videojuego) {
    this.voto = 0;
    this.request.obtenerComentarios(item.idVideojuego).subscribe( v => {
      this.comentarios = v;
      this.videojuegoSelected = item;
      this.selected = true;
    });

    this.request.obtenerVotos(item.idVideojuego).subscribe( v => {
      this.voto = 0;
      v.forEach((e: { votacion: number; }) => {
        this.voto += e.votacion;
      });
    });
    

  }

  //Opción de eliminar comentario
  eliminarComentario(item: any) {
    if (this.videojuegoSelected && this.usuario) {
      let comentario = <any>{};
      comentario.idComentario = item.idComentario;
      this.request.deleteComentario(comentario).subscribe( v => {
        this.request.obtenerComentarios(this.videojuegoSelected.idVideojuego).subscribe( v => {
          this.comentarios = v;
        });
      });

    }
  }

  //Con este método creamos un comentario dentro de la página del videojuego
  createComentario(){

    if (this.videojuegoSelected && this.usuario && this.comentario && this.comentario !== '') {
      let comentario = <any>{};
      comentario.descripcion = this.comentario;
      comentario.idUsuario = this.idUsuario;
      comentario.idVideojuego = this.videojuegoSelected.idVideojuego;
      this.request.createComentarios(comentario).subscribe( v => {
        this.comentario = '';
        this.request.obtenerComentarios(this.videojuegoSelected.idVideojuego).subscribe( v => {
          this.comentarios = v;
        });
      });

    }
  }


  //Contador de votaciones de la página del videojuego.
  votacion(votos: number) {
    let votacion = <any>{};
    votacion.idUsuario = this.idUsuario;
    votacion.idVideojuego = this.videojuegoSelected.idVideojuego;
    votacion.votacion = votos;

    this.request.createVotos(votacion).subscribe( v => {
      this.request.obtenerVotos(this.videojuegoSelected.idVideojuego).subscribe( v => {

        this.voto = 0;
        v.forEach((e: { votacion: number; }) => {
          this.voto += e.votacion;
        });
      });
    });
  }
}
