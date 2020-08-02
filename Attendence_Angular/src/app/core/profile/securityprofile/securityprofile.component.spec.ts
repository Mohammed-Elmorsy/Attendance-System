import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityprofileComponent } from './securityprofile.component';

describe('SecurityprofileComponent', () => {
  let component: SecurityprofileComponent;
  let fixture: ComponentFixture<SecurityprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
