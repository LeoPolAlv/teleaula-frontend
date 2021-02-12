import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarService } from 'src/app/service/validador/validar.service';
import { AlumnoService } from '../../../service/alumno.service';
import { AlumnoCService } from '../../../service/converters/alumnoC.service';
import { Alumno } from '../../../interfaces/alumno';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { Asignatura } from '../../../interfaces/asignatura';
import { AsignaturaAlumnoService } from '../../../service/asignatura-alumno.service';
import { Configuracion } from 'src/app/service/general/configuracion';

@Component({
  selector: 'app-alumno-new',
  templateUrl: './alumno-new.component.html',
  styleUrls: ['./alumno-new.component.css']
})
export class AlumnoNewComponent implements OnInit {

  cicloEducativo: {[key: number]: string} = {
    1: 'INFANTIL', 2: 'PRIMARIA', 3: 'SECUNDARIA', 4: 'BACHILLERATO'};

  // Formgroup es necesario para la creacion y manejo del formualrio. Esta compuesto de varios FormControls
  // cada formcontrol es un campo del  fromulario HTML
  forma: FormGroup;
  alumnoRest: Alumno;
  asignaturas: Asignatura;
  valorCiclo: string;
  valorCurso: string;
  cursoAcademico: string;
  arrayAsignaturas: any[] = [];
  arrayOpcionales: any[] = [];
  arrayTroncales: any[] = [];
  arrayOpcionalSelect: any[] = [];
  arrayTroncalSelect: any[] = [];
    // Formbuilder es un servicio que nos ayuda a la creacion de los formcontrols de nuestro formulario

  constructor(private fb: FormBuilder,
              private validador: ValidarService,
              private alumnoService: AlumnoService,
              private converteAlumno: AlumnoCService,
              private asignaturaService: AsignaturaService,
              private asignaturaAlumnoService: AsignaturaAlumnoService,
              private calculoFechaCurso: Configuracion) {
        // this.getAlumnos();
        // this.cargarFormulario();
        this.cursoAcademico = this.calculoFechaCurso.cursoEscolar.toString();
        console.log('Constructor de Alumno');
        console.log('Creando el formulario');
        this.crearFormulario();
        console.log('Creamos listeners');
        this.crearListeners();
}

  ngOnInit(): void {
  }

  getAlumnos(): any{
    this.alumnoService.getAlumnos()
          .subscribe( alumnos => console.log(alumnos));
  }
/*
  Creamos el fomrulario reactive en primer lugar. NO OLVIDAR PONER EN EL APP.MODULE EL IMPORT DEL REACTIVEFORMMODULE
*/
  crearFormulario(): any {
    this.forma = this.fb.group ({
      nombre: ['', [Validators.required, Validators.minLength(3), this.validador.empiezoMal] ],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validador.empiezoMal]],
      email: ['', [Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'),
                    Validators.required] ],
      fechaNacimiento: ['',  Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      cPostal: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      dni: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('[0-9]{6}[A-Z]{1}')]],
      fechaMatricula: ['', Validators.required],
      ciclo: ['', Validators.required],
      curso: [this.cursoAcademico, [Validators.required, Validators.pattern('[1-6]{1}')]],
      domicilio : this.fb.group ({
        direccion: ['', Validators.required],
        numero: ['', Validators.required],
        planta: ['', Validators.required]
      }),
        asignaturasTroncal: this.fb.array([]),
        asignaturasOpcional: this.fb.array([])
    }, {
      validators: this.validador.validardni,
    }
    );

  }
  // Obtenemos una propiedad pero que se procesa una informacion
  campoValido(campo: string): any{
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  obtenerAsignaturas(): Asignatura{
    console.log('Obtener Asignaturas');
    return this.asignaturaService.getAllAsignaturas();
    /*                             .subscribe( (datos: any) => {
       console.log(`datos que leo despues del constructor: ${datos}`);
     });*/
  }

  obtenerAsignaturasCicloCurso(): any{

    const cicloAux = this.forma.get('ciclo').value;
    const curosAux = this.forma.get('curso').value;

    this.asignaturaService.getAsignaturasCicloCurso(cicloAux, curosAux)
                          .subscribe( asignaturas => {
                            Object.values(asignaturas).forEach( (asignatura: Asignatura) => {
                              console.log(asignatura);
                              console.log(asignatura.tipo);
                              if ( asignatura.tipo === 'TRONCAL'){
                                console.log('Entro en troncal');
                                this.arrayTroncales.push(asignatura);
                              } else {
                                console.log('Entro en opcional');
                                this.arrayOpcionales.push(asignatura);
                              }
                            });
                          });
  }

  getValuesT(): any {
    console.log(`Asignaturas Seleccionadas: ${this.arrayTroncalSelect}`);

    // this.allAsignaturas(this.arrayTroncalSelect);
  }

  getValuesO(): any {
    console.log(`Asignaturas Seleccionadas: ${this.arrayOpcionalSelect}`);

    // this.allAsignaturas(this.arrayOpcionalSelect);
  }

  allAsignaturas(): any[] {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.arrayTroncalSelect.length; i++){
      this.arrayAsignaturas.push(this.arrayTroncalSelect[i]);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.arrayOpcionalSelect.length; i++){
      this.arrayAsignaturas.push(this.arrayOpcionalSelect[i]);
    }
    console.log(this.arrayAsignaturas);
    return this.arrayAsignaturas;
  }
/* get asignaturasT(): FormArray {
     return this.forma.get('asignaturasTroncal') as FormArray;
   }
*/

  crearListeners(): any{
      /*this.forma.valueChanges.subscribe( valores => {
                                          console.log(valores);
                                        });
      this.forma.statusChanges.subscribe(status => {
        console.log(status);*/

      this.forma.get('ciclo').statusChanges.subscribe( statusCiclo => {console.log(`Listener statusCiclo: ${statusCiclo}`);
      });

      this.forma.get('ciclo').valueChanges.subscribe( valueCiclo => {
                  console.log(`Listener ValueCurso: ${valueCiclo}`);
                  this.valorCiclo = valueCiclo;
      });
      this.forma.get('curso').statusChanges.subscribe( statusCurso => {console.log(`Listener statusCurso: ${statusCurso}`);
      });

      this.forma.get('curso').valueChanges.subscribe( valueCurso => {
                  console.log(`Listener ValueCiclo: ${valueCurso}`);
                  this.valorCurso = valueCurso;
      });
  }

  guardar(): any {

    // this.obtenerAsignaturasCicloCurso();
    // Al pulsar el boton ponemos el valor de touched a todos los campos para que valide si esos campos
    // son validos a no. se validan los campos siempre que se marcan como touched(que se han tocado)
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach( controlGrupo =>
              controlGrupo.markAsTouched());
          } else {
              control.markAsTouched();
            }
          });
    } else {
      // incluimos todas las asignaturas seleccionadas en un solo array para enviar al servicio
        this.allAsignaturas();
        this.alumnoRest = this.converteAlumno.convertirAlumnoRest(this.forma);
        // this.alumnoRest.asignaturasAlumno.push(arrayAux);
        // console.log(this.alumnoRest.asignaturasAlumno);
        // Enviamos los datos del alumno a dar de alta y recibimos el objeto creado con su nunemro de ID que usaremos despues.
        this.alumnoService.newAlumno(this.alumnoRest)
                          .subscribe(response => {
                              console.log(response.id);
                              this.asignaturaAlumnoService.newAsignaturaAlumno(this.cursoAcademico, response.id, this.arrayAsignaturas)
                                // tslint:disable-next-line: no-shadowed-variable
                                                          .subscribe((responseAS: any) =>
                                                                       console.log(`Respuesta Asignatura Alumno : ${responseAS}`));
                        });
        // this.crearFormulario();
    }
  }
}

