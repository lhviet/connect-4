import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTechStackComponent } from './info-tech-stack.component';

describe('InfoTechStackComponent', () => {
  let component: InfoTechStackComponent;
  let fixture: ComponentFixture<InfoTechStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTechStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
