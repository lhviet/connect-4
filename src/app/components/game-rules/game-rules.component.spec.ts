import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRulesComponent } from './game-rules.component';

describe('GameRulesComponent', () => {
  let component: GameRulesComponent;
  let fixture: ComponentFixture<GameRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
