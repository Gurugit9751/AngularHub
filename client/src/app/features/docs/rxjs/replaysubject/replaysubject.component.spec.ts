import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaysubjectComponent } from './replaysubject.component';

describe('ReplaysubjectComponent', () => {
  let component: ReplaysubjectComponent;
  let fixture: ComponentFixture<ReplaysubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaysubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaysubjectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
