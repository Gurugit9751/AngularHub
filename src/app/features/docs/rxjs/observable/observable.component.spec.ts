import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableComponent } from './observable.component';

describe('ObservableComponent', () => {
  let component: ObservableComponent;
  let fixture: ComponentFixture<ObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
