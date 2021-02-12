import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../interfaces/alumno';
import { Asignatura } from '../interfaces/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaAlumnoService {

  constructor(private http: HttpClient) { }

  newAsignaturaAlumno(curso: string, alumno: number, asignatura: any[]): any{
    const urlAcceso = `http://localhost:8080/alumno/${ curso }/${ alumno }/${ asignatura }`;

    const  headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Access-Control-Allow-Origin', '*')
                                      .set('Accept', '*/*');
    // console.log(headers);
    return this.http.post(urlAcceso, [curso, alumno, asignatura], {headers});
  }
}
