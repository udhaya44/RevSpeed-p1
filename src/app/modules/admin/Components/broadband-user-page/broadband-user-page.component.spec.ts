import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadbandUserPageComponent } from './broadband-user-page.component';

describe('BroadbandUserPageComponent', () => {
  let component: BroadbandUserPageComponent;
  let fixture: ComponentFixture<BroadbandUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadbandUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BroadbandUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
