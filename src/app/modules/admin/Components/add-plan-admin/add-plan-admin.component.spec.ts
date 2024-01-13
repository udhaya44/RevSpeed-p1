import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanAdminComponent } from './add-plan-admin.component';

describe('AddPlanAdminComponent', () => {
  let component: AddPlanAdminComponent;
  let fixture: ComponentFixture<AddPlanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlanAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
