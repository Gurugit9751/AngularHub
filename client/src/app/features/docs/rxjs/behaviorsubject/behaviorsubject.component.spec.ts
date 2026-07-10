import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorsubjectComponent } from './behaviorsubject.component';

describe('BehaviorsubjectComponent', () => {
  let component: BehaviorsubjectComponent;
  let fixture: ComponentFixture<BehaviorsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorsubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorsubjectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
