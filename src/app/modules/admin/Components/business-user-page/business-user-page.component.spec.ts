import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUserPageComponent } from './business-user-page.component';

describe('BusinessUserPageComponent', () => {
  let component: BusinessUserPageComponent;
  let fixture: ComponentFixture<BusinessUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
