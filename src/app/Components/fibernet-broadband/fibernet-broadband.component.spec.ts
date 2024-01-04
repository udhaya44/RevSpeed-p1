import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibernetBroadbandComponent } from './fibernet-broadband.component';

describe('FibernetBroadbandComponent', () => {
  let component: FibernetBroadbandComponent;
  let fixture: ComponentFixture<FibernetBroadbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FibernetBroadbandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FibernetBroadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
