import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBusinessplanComponent } from './buy-businessplan.component';

describe('BuyBusinessplanComponent', () => {
  let component: BuyBusinessplanComponent;
  let fixture: ComponentFixture<BuyBusinessplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyBusinessplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyBusinessplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
