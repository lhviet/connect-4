import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './containers/app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameCoinComponent } from './components/game-coin/game-coin.component';
import {GameService} from './services/game/game.service';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameCoinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
