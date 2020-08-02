import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmpListComponent } from './all-emp-list.component';

describe('AllEmpListComponent', () => {
  let component: AllEmpListComponent;
  let fixture: ComponentFixture<AllEmpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
