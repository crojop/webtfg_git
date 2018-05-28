import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalFormComponent } from './terminal-form.component';

describe('TerminalFormComponent', () => {
  let component: TerminalFormComponent;
  let fixture: ComponentFixture<TerminalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
