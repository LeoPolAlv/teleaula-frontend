import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

// COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnoSearchComponent } from './components/alumno/alumno-search/alumno-search.component';
import { AlumnoNewComponent } from './components/alumno/alumno-new/alumno-new.component';
import { AsignaturaNewComponent } from './asignatura/asignatura-new/asignatura-new.component';
import { AsignaturaSearchComponent } from './asignatura/asignatura-search/asignatura-search.component';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// SERVICIOS
import { AlumnoCService } from './service/converters/alumnoC.service';
import { AlumnoService } from './service/alumno.service';
import { AsignaturaService } from './service/asignatura.service';
import { AsignaturaCService } from './service/converters/asignatura-c.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Configuracion } from './service/general/configuracion';

// tslint:disable-next-line: typedef
export function dataFactory(provider: Configuracion) {
  return () => provider.calculoFechaCurso();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AlumnoSearchComponent,
    AlumnoNewComponent,
    AsignaturaNewComponent,
    AsignaturaSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [AlumnoService,
              AlumnoCService,
              AsignaturaService,
              AsignaturaCService,
              Configuracion,
              {
                provide: APP_INITIALIZER,
                useFactory: dataFactory,
                deps: [Configuracion],
                multi: true
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
