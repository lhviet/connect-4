import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCoinComponent } from './game-coin.component';

describe('GameCoinComponent', () => {
  let component: GameCoinComponent;
  let fixture: ComponentFixture<GameCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
