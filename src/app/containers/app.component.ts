import {Component} from '@angular/core';
import {GameService} from '../services/game/game.service';
import {Coin} from '../models/coin';
import {ECoin} from '../enums/e-coin.enum';


const PLAYER_1 = 'Player 1';
const PLAYER_2 = 'Player 2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gameMatrix = this.gameService.gameStateMatrix;
  availablePositionSet = this.gameService.availablePositionSet;

  playerTurn = PLAYER_1;

  constructor(private gameService: GameService) {
  }

  onCoinClicked = (coin: Coin) => {
    this.gameService.setCoin(coin);
    this.playerTurn = this.gameService.getCurrentTurnPlayer().identity === ECoin.player1 ? PLAYER_1 : PLAYER_2;
  }

}
