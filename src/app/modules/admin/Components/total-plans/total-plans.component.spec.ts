import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPlansComponent } from './total-plans.component';

describe('TotalPlansComponent', () => {
  let component: TotalPlansComponent;
  let fixture: ComponentFixture<TotalPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
