import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentformPage } from './commentform.page';

describe('CommentformPage', () => {
  let component: CommentformPage;
  let fixture: ComponentFixture<CommentformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
