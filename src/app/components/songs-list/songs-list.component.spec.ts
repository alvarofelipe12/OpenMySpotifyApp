import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsListComponent } from './songs-list.component';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
