import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown004Component } from './dropdown004.component';

describe('Dropdown004Component', () => {
  let component: Dropdown004Component;
  let fixture: ComponentFixture<Dropdown004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown004Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
