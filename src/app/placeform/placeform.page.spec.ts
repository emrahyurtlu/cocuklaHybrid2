import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceformPage } from './placeform.page';

describe('PlaceformPage', () => {
  let component: PlaceformPage;
  let fixture: ComponentFixture<PlaceformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
