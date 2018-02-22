import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GameCoinComponent} from '../components/game-coin/game-coin.component';
import {GamePlayerComponent} from '../components/game-player/game-player.component';
import {GameBoardComponent} from '../components/game-board/game-board.component';
import {GameService} from '../services/game/game.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameCoinComponent,
        GamePlayerComponent,
        GameBoardComponent
      ],
      providers: [
        GameService
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
