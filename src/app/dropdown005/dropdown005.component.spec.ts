import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown005Component } from './dropdown005.component';

describe('Dropdown005Component', () => {
  let component: Dropdown005Component;
  let fixture: ComponentFixture<Dropdown005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown005Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
