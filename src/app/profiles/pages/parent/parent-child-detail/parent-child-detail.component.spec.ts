import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildDetailComponent } from './parent-child-detail.component';

describe('ParentChildDetailComponent', () => {
  let component: ParentChildDetailComponent;
  let fixture: ComponentFixture<ParentChildDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentChildDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentChildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
