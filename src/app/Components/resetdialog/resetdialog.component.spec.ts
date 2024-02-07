import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetdialogComponent } from './resetdialog.component';

describe('ResetdialogComponent', () => {
  let component: ResetdialogComponent;
  let fixture: ComponentFixture<ResetdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
