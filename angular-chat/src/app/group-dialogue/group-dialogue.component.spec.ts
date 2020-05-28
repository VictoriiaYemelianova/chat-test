import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogueComponent } from './group-dialogue.component';

describe('GroupDialogueComponent', () => {
  let component: GroupDialogueComponent;
  let fixture: ComponentFixture<GroupDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
