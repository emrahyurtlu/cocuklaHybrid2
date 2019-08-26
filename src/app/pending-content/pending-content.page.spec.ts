import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContentPage } from './pending-content.page';

describe('PendingContentPage', () => {
  let component: PendingContentPage;
  let fixture: ComponentFixture<PendingContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
