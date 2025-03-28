import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown001Component } from './dropdown001.component';

describe('Dropdown001Component', () => {
  let component: Dropdown001Component;
  let fixture: ComponentFixture<Dropdown001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown001Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
