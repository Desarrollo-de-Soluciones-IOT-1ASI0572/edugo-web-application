import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentParentSidebarComponent } from './component-parent-sidebar.component';

describe('ComponentParentSidebarComponent', () => {
  let component: ComponentParentSidebarComponent;
  let fixture: ComponentFixture<ComponentParentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentParentSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentParentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
