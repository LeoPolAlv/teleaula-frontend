import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaNewComponent } from './asignatura-new.component';

describe('AsignaturaNewComponent', () => {
  let component: AsignaturaNewComponent;
  let fixture: ComponentFixture<AsignaturaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
