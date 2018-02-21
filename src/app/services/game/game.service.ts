import {Injectable} from '@angular/core';
import {ICoin} from '../../interfaces/i-coin';
import {Coin} from '../../models/coin';
import {Player} from '../../models/player';
import {ECoin} from '../../enums/e-coin.enum';

@Injectable()
export class GameService {

  // create a matrix 6x7 to hold the state of the game
  gameStateMatrix: ICoin[][] = [];

  player1 = new Player(ECoin.player1);
  player2 = new Player(ECoin.player2);

  constructor() {

    // initialize the game state
    this.resetGameState();

  }

  resetGameState() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      const row: Coin[] = [];
      for (let colIndex = 0; colIndex < 7; colIndex++) {
        row.push(new Coin());
      }
      this.gameStateMatrix.push(row);
    }
  }

  // determine current turn of player
  // // player 1 goes first
  getCurrentTurnPlayer = (): Player => this.player1.count === this.player2.count ? this.player1 : this.player2;

  setCoin(coin: Coin) {
    this.getCurrentTurnPlayer().setCoin(coin);
  }

}
