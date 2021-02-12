import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoNewComponent } from './components/alumno/alumno-new/alumno-new.component';
import { AlumnoSearchComponent } from './components/alumno/alumno-search/alumno-search.component';
import { HomeComponent } from './components/home/home.component';
import { AsignaturaNewComponent } from './asignatura/asignatura-new/asignatura-new.component';
import { AsignaturaSearchComponent } from './asignatura/asignatura-search/asignatura-search.component';

const routes: Routes = [
  { path: 'alumno/new', component: AlumnoNewComponent },
  { path: 'alumno/search', component: AlumnoSearchComponent },
  { path: 'asignatura/new', component: AsignaturaNewComponent },
  { path: 'asignatura/search', component: AsignaturaSearchComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
  // { path: 'home', component: PageNotFoundComponent },
  // { path: 'path', component: FeatureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
