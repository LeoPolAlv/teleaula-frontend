import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Alumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  constructor(private http: HttpClient) { }

  getUrlAcceso( query: string): any{

    const url = `http://localhost:8080/alumno/${ query }`;

    console.log(url);
    return this.http.get(url);
  }

  getAlumnos(): any{
    return this.getUrlAcceso('alls')
                .pipe( map ( datos => console.log(datos) ));
  }

  /*
    Agregamos uno regitro a la BD
  */
  newAlumno(cuerpo: Alumno): any{
    const urlAcceso = 'http://localhost:8080/alumno/new';

    // Establecemos cabeceras
    const  headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Access-Control-Allow-Origin', '*')
                                      .set('Accept', '*/*');
    // console.log(headers);
    return this.http.post(urlAcceso, cuerpo, {headers});
  }
}
