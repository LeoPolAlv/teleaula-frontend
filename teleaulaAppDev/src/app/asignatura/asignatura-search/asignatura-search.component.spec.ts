import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaSearchComponent } from './asignatura-search.component';

describe('AsignaturaSearchComponent', () => {
  let component: AsignaturaSearchComponent;
  let fixture: ComponentFixture<AsignaturaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
