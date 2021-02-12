export interface Asignatura {
    id: number;
    denominacion: string;
    tipo: string;
    ciclo: string;
    curso: string;
    anioEscolar: string;
    asignaturasAlumno: [];
    asignaturasProfesor: [];
    examen: [];
    librostexto: [];
}
