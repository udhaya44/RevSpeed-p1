import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOngoingPlansComponent } from './user-ongoing-plans.component';

describe('UserOngoingPlansComponent', () => {
  let component: UserOngoingPlansComponent;
  let fixture: ComponentFixture<UserOngoingPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOngoingPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOngoingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
