import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoFormularioComponent } from './instrumento-formulario.component';

describe('InstrumentoFormularioComponent', () => {
  let component: InstrumentoFormularioComponent;
  let fixture: ComponentFixture<InstrumentoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstrumentoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
