import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lista:string[]=["hola","que","tal","estas"];

  listaFiltrada:string[]=["hola","que","tal","estas"];

  valorIntroducido: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  buscador() {
    setTimeout(() => {

    this.listaFiltrada = [];
    this.lista.forEach(el => {
      for (let index = 0; index < el.length; index++) {
        const element = el[index];
        for (let i = 0; i < this.valorIntroducido.length; i++) {
          const va = this.valorIntroducido[i];
          
          if (element === va) {
            let find = false;
            this.listaFiltrada.forEach(fil => {
              if (fil === el) {
                find = true;
              }
            });
            if (!find) {
              this.listaFiltrada.push(el);
            }
          }
        }

      }
    });
    });
    
  }
}
