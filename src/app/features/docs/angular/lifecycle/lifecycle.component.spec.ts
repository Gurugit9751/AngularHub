import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleComponent } from './lifecycle.component';

describe('LifecycleComponent', () => {
  let component: LifecycleComponent;
  let fixture: ComponentFixture<LifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecycleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
