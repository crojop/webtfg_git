import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabledialogComponent } from './tabledialog.component';

describe('TabledialogComponent', () => {
  let component: TabledialogComponent;
  let fixture: ComponentFixture<TabledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
