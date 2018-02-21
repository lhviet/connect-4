import {Injectable} from '@angular/core';
import {Coin} from '../../models/coin';
import {Player} from '../../models/player';
import {ECoin} from '../../enums/e-coin.enum';
import GameHelper from '../../helpers/game-helper';

@Injectable()
export class GameService {

  // create a matrix 6x7 to hold the state of the game
  gameStateMatrix: Coin[][] = [];

  player1 = new Player(ECoin.player1);
  player2 = new Player(ECoin.player2);

  winCoinPositions: string[];
  availablePositionSet: Set<string>;

  constructor() {

    // initialize the game state
    this.resetGameState();

  }

  resetGameState() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      const row: Coin[] = [];
      for (let colIndex = 0; colIndex < 7; colIndex++) {
        row.push(new Coin(rowIndex, colIndex));
      }
      this.gameStateMatrix.push(row);
    }
    console.log(this.gameStateMatrix);
    this.availablePositionSet = new Set(['50', '51', '52', '53', '54', '55', '56']);
  }

  // determine current turn of player
  // player 1 goes first
  getCurrentTurnPlayer = (): Player => this.player1.count === this.player2.count ? this.player1 : this.player2;

  setCoin(coin: Coin) {
    if (this.availablePositionSet.has(coin.position)) {
      this.getCurrentTurnPlayer().setCoin(coin);

      // check the win positions in every step made
      this.winCoinPositions = GameHelper.getWinPositions(this.gameStateMatrix, coin);
      console.log('winCoinPositions = ', this.winCoinPositions);
      if (this.winCoinPositions && this.winCoinPositions.length === 4) {
        return;
      }

      // calculate the available position of coin for the next turn
      // step 1: retrieve all coins dropped
      const dropCoins: Coin[] = [];
      this.gameStateMatrix.forEach(row => dropCoins.push(...row.filter(theCoin => !theCoin.isUnset())));

      // step 2: get available positions of all dropped coins
      dropCoins.forEach(dropCoin => {
        const pos = GameHelper.getAvailablePositionOfCoin(dropCoin);
        if (pos) {
          this.availablePositionSet.add(pos);
        }
      });

      // step 3: get all possible positions (overlapped) occupied coins
      dropCoins.forEach(dropCoin => {
        if (this.availablePositionSet.has(dropCoin.position)) {
          this.availablePositionSet.delete(dropCoin.position);
        }
      });
      console.log(Array.from(this.availablePositionSet).toString());
    }
  }

}
