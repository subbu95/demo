import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown006Component } from './dropdown006.component';

describe('Dropdown006Component', () => {
  let component: Dropdown006Component;
  let fixture: ComponentFixture<Dropdown006Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown006Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
