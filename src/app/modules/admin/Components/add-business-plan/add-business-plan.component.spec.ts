import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessPlanComponent } from './add-business-plan.component';

describe('AddBusinessPlanComponent', () => {
  let component: AddBusinessPlanComponent;
  let fixture: ComponentFixture<AddBusinessPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBusinessPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBusinessPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
