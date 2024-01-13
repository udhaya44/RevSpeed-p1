import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSubscriptionsComponent } from './total-subscriptions.component';

describe('TotalSubscriptionsComponent', () => {
  let component: TotalSubscriptionsComponent;
  let fixture: ComponentFixture<TotalSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalSubscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
