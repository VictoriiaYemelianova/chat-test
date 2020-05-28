import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUserComponent } from './log-user.component';

describe('LogUserComponent', () => {
  let component: LogUserComponent;
  let fixture: ComponentFixture<LogUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
