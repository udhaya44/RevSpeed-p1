import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPopComponent } from './form-pop.component';

describe('FormPopComponent', () => {
  let component: FormPopComponent;
  let fixture: ComponentFixture<FormPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
