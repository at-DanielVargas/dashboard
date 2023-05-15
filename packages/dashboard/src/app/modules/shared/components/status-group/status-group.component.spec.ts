import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusGroupComponent } from './status-group.component';

describe('StatusGroupComponent', () => {
  let component: StatusGroupComponent;
  let fixture: ComponentFixture<StatusGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusGroupComponent]
    });
    fixture = TestBed.createComponent(StatusGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
