import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyOtpComponent } from './varify-otp.component';

describe('VarifyOtpComponent', () => {
  let component: VarifyOtpComponent;
  let fixture: ComponentFixture<VarifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarifyOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
