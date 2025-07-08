import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAccountComponent } from './parent-account.component';

describe('ParentAccountComponent', () => {
  let component: ParentAccountComponent;
  let fixture: ComponentFixture<ParentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
