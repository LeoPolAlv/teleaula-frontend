import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignatura } from '../interfaces/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) {  }

  getUrlAcceso( query: string): any{

    const url = `http://localhost:8080/asignatura/${ query }`;

    // console.log(url);
    return this.http.get(url);
  }

  getAllAsignaturas(): any {

    return this.getUrlAcceso('find/all')
                .subscribe(asignaturas => console.log(`Asignaturas servicio: ${asignaturas}`));
  }

  getAsignaturasCicloCurso(ciclo: string, curso: string): any {

    return this.getUrlAcceso(`find/${ciclo}/${curso}`);
    //            .subscribe(asignaturas => console.log(asignaturas));
  }

  newAsignatura(cuerpo: Asignatura): any{
    const urlAcceso = 'http://localhost:8080/asignatura/new';

    // Establecemos cabeceras
    const  headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Access-Control-Allow-Origin', '*')
                                      .set('Accept', '*/*');
    // console.log(headers);
    return this.http.post(urlAcceso, cuerpo, {headers})
                    .subscribe();
  }
}
