import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../../service/asignatura.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Asignatura } from '../../interfaces/asignatura';
import { AsignaturaCService } from '../../service/converters/asignatura-c.service';
import { Configuracion } from 'src/app/service/general/configuracion';

@Component({
  selector: 'app-asignatura-new',
  templateUrl: './asignatura-new.component.html',
  styles: [
  ]
})
export class AsignaturaNewComponent implements OnInit {

  // Decalaramos objetos enum para usar en deplegables
  cicloEducativo: {[key: number]: string} = {
    1: 'INFANTIL', 2: 'PRIMARIA', 3: 'SECUNDARIA', 4: 'BACHILLERATO'};

  tipoAsignatura: {[key: number]: string} = {1: 'TRONCAL', 2: 'OPCIONAL'};

  formAsignatura: FormGroup;
  asignaturaRest: Asignatura;

  constructor(private fb: FormBuilder,
              private asignaturaService: AsignaturaService,
              private asignaturaConverte: AsignaturaCService,
              private fechaCurso: Configuracion) {
      // this.calculoFechaCurso();
      // this.crearFormulario();
               }

  ngOnInit(): void {
    // this.asignaturaService.getAllAsignaturas();
    this.crearFormulario();
  }

  /*
  Creamos el fomrulario reactive en primer lugar. NO OLVIDAR PONER EN EL APP.MODULE EL IMPORT DEL REACTIVEFORMMODULE
*/
  crearFormulario(): any {
    this.formAsignatura = this.fb.group ({
      denominacion: ['', Validators.required],
      tipo: ['', Validators.required],
      ciclo: ['', Validators.required],
      curso: ['',  [Validators.required, Validators.pattern('[0-9]{1}')]],
      anioEscolar: [this.fechaCurso.cursoEscolar.toString(), Validators.required]
      }
    );
  }

  campoValido(campo: string): any{
    return this.formAsignatura.get(campo).invalid && this.formAsignatura.get(campo).touched;
  }

  guardar(): void {
    if (this.formAsignatura.invalid) {
      Object.values(this.formAsignatura.controls).forEach( control => {

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach( controlGrupo =>
              controlGrupo.markAsTouched());
          } else {
              control.markAsTouched();
            }
          });
    } else {
         this.asignaturaRest = this.asignaturaConverte.convertirAlumnoRest(this.formAsignatura);
         console.log(this.asignaturaRest);
         this.asignaturaService.newAsignatura(this.asignaturaRest);
         this.crearFormulario();
    }
  }

}
