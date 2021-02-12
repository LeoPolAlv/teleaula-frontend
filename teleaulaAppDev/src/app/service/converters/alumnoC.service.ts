import { Injectable } from '@angular/core';
import { Alumno } from '../../interfaces/alumno';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AlumnoCService {
  // private alumnoEnviar: Alumno;
  private direccionAux: string;

  constructor() { }

  public convertirAlumnoRest(alumnoIn: FormGroup): Alumno {

      this.direccionAux = `${alumnoIn.get('domicilio.direccion').value}, ${alumnoIn.get('domicilio.numero').value}, ${+alumnoIn.get('domicilio.planta').value}`;

     /* concat(alumnoIn.get('domicilio.direccion').value, alumnoIn.get('domicilio.numero').value,
                          alumnoIn.get('domicilio.planta').value);
*/
      // tslint:disable-next-line: one-variable-per-declaration
      const alumnoEnviar: any = {
        nombre: alumnoIn.get('nombre').value,
        apellidos: alumnoIn.get('apellido').value,
        email: alumnoIn.get('email').value,
        fechaNacimiento: alumnoIn.get('fechaNacimiento').value,
        localidad: alumnoIn.get('localidad').value,
        provincia: alumnoIn.get('provincia').value,
        codigoPostal: alumnoIn.get('cPostal').value,
        dni: alumnoIn.get('dni').value,
        numeroMatricula: alumnoIn.get('matricula').value,
        fechaMatricula: alumnoIn.get('fechaMatricula').value,
        ciclo: alumnoIn.get('ciclo').value,
        curso: alumnoIn.get('curso').value,
        direccion: this.direccionAux,
        asignaturasAlumno: [],
        alumnoEvaluacion: []
      };

      console.log(`Alumno a enviar: ${alumnoEnviar}`);
      return alumnoEnviar;
  }
}
