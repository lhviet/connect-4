import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './containers/app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameCoinComponent } from './components/game-coin/game-coin.component';
import {GameService} from './services/game/game.service';
import { GamePlayerComponent } from './components/game-player/game-player.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { InfoTechStackComponent } from './components/info-tech-stack/info-tech-stack.component';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameCoinComponent,
    GamePlayerComponent,
    NavFooterComponent,
    GameRulesComponent,
    InfoTechStackComponent
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
