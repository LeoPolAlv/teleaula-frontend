import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Configuracion {

  // Cargamos el valor del parametro anioEscolar
  private anioEscolarAux: any;
  constructor(private http: HttpClient) { }

  calculoFechaCurso(): void{
    // let fechaCurso: string;
    this.http.get('../../assets/files/configuracion.json').subscribe(data => {
       this.anioEscolarAux = data;
      // console.log(`año escolar: ${this.anioEscolarAux.anioEscolar}`);
    });
  }
  get cursoEscolar(): string{
    return this.anioEscolarAux.anioEscolar;
  }
}
