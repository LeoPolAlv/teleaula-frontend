import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidarService {

  constructor() { }


  // evaluo el contenido que me llega del formcontrol y devuelvo un valor + true/false
  empiezoMal(control: AbstractControl): ErrorValidate {

    const cadenaRecibida = control.value;
    const buscada = new RegExp('[0-9]');

    if (cadenaRecibida.search(buscada) !== -1){
        return {
            campoNoValido: true
        };
    }
    return null;
  }

  /*
   Lo que estoy haciendo es definir una función de validación o ValidatorFn, que recibe como parámetro un grupo de campos,
   FormGroup, y va a regresar o un objeto de errores de validación, ValidationErrors, o un null.
  */
  // tslint:disable-next-line: typedef
  validardni: ValidatorFn = ( control: FormGroup): ValidationErrors | null => {
      console.log('entro a validar DNI');
      const dniControl = control.get('dni').value;
      const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
     // const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    // var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      const str = dniControl.toString().toUpperCase();
      console.log(dniControl);

      /* if (!nifRexp.test(str)) { return  {
          dniNoValido: false
      }; }*/

      /*const nie = str
          .replace(/^[X]/, '0')
          .replace(/^[Y]/, '1')
          .replace(/^[Z]/, '2');
    */
      const letter = str.substr(-1);
      // tslint:disable-next-line: radix
      console.log(letter);
      // tslint:disable-next-line: radix
      const charIndex = parseInt(str.substr(0, 8)) % 23;
      console.log(charIndex);
      console.log(validChars.charAt(charIndex));
      if (validChars.charAt(charIndex) === letter){
          console.log('son iguales');
          return null;
      } else{
        console.log('Son diferentes');
        return {dniNoValido: true}; }
  }

/*  usuarioExiste(control: FormGroup): Promise<ErrorValidate> | Observable<ErrorValidate>{

    if (!control.value){
      return Promise.resolve(null);
    }

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( (resolve, reject ) => {
          setTimeout ( () => {
              if (control.value === 'Leo'){
                resolve( {existe: true} );
              } else {
                resolve(null);
              }
          }, 3500);
    });
  }*/
}
