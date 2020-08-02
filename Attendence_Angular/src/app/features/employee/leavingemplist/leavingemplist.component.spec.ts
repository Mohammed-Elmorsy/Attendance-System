import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingemplistComponent } from './leavingemplist.component';

describe('LeavingemplistComponent', () => {
  let component: LeavingemplistComponent;
  let fixture: ComponentFixture<LeavingemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
