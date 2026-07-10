import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardsComponent } from './guards.component';

describe('GuardsComponent', () => {
  let component: GuardsComponent;
  let fixture: ComponentFixture<GuardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
