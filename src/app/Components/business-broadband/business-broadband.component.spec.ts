import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBroadbandComponent } from './business-broadband.component';

describe('BusinessBroadbandComponent', () => {
  let component: BusinessBroadbandComponent;
  let fixture: ComponentFixture<BusinessBroadbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessBroadbandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessBroadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
