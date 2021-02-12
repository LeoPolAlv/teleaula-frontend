import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Asignatura } from 'src/app/interfaces/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaCService {

  constructor() { }

  public convertirAlumnoRest(asignaturaIn: FormGroup): Asignatura {

    const asignaturaEnviar: any = {
      denominacion: asignaturaIn.get('denominacion').value,
      tipo: asignaturaIn.get('tipo').value,
      ciclo: asignaturaIn.get('ciclo').value,
      curso: asignaturaIn.get('curso').value,
      anioEscolar: asignaturaIn.get('anioEscolar').value,
      asignaturasAlumno: [],
      asignaturasProfesor: [],
      examen: [],
      librostexto: [],
    };

    console.log(asignaturaEnviar);
    return asignaturaEnviar;
}
}
