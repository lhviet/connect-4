import {Injectable} from '@angular/core';
import {Coin} from '../../models/coin';
import {Player} from '../../models/player';
import {ECoin} from '../../enums/e-coin.enum';
import GameHelper from '../../helpers/game-helper';
import {PlayerRobot} from '../../models/player-robot';
import {Subject} from 'rxjs/Subject';

interface IStore {
  gameStateMatrix: Coin[][];  // create a matrix 6x7 to hold the state of the game
  player1: Player;
  player2: Player | PlayerRobot;
  winCoinPositions: string[];
  availablePositionSet: Set<string>;
}

@Injectable()
export class GameService {

  store: IStore  = {
    gameStateMatrix: [],
    player1: new Player(ECoin.player1),
    player2: new PlayerRobot(),
    winCoinPositions: [],
    availablePositionSet: new Set()
  };

  // Observable current Player turn source
  private playerTurnSource = new Subject<ECoin.player1 | ECoin.player2>();
  // Observable current Player turn streams
  playerTurn$ = this.playerTurnSource.asObservable();

  // Observable Player win source
  private playerWinSource = new Subject<ECoin.player1 | ECoin.player2>();
  // Observable Player win streams
  playerWin$ = this.playerWinSource.asObservable();

  constructor() {
    // initialize the game state
    this.resetGameState();
  }

  resetGameState() {
    // reset game state matrix
    this.store.gameStateMatrix.length = 0;
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      const row: Coin[] = [];
      for (let colIndex = 0; colIndex < 7; colIndex++) {
        row.push(new Coin(rowIndex, colIndex));
      }
      this.store.gameStateMatrix.push(row);
    }

    // reset available positions to the bottom row
    this.store.availablePositionSet.clear();
    ['50', '51', '52', '53', '54', '55', '56']
      .forEach(pos => this.store.availablePositionSet.add(pos));

    // reset series of win positions of coin
    this.store.winCoinPositions.length = 0;

    // reset players data
    this.store.player1.reset();
    this.store.player2.reset();

    this.announceNextTurnPlayer(ECoin.player1);
  }

  // announce turn of Player updated
  announceNextTurnPlayer = (player: ECoin.player1 | ECoin.player2) => this.playerTurnSource.next(player);

  // set coin for current Player
  // all the logic of setting coin in function setCoin in this service
  setCoin(coin: Coin) {

    // determine current turn of player
    const currentTurnPlayer = this.store.player1.count === this.store.player2.count ? this.store.player1 : this.store.player2;

    // validate a valid step of human user
    if (currentTurnPlayer.isComputer) {
      return;
    }

    if (!currentTurnPlayer.isComputer) {
      currentTurnPlayer.setCoin(coin);
      this.updateAvailablePositions();
      this.announceNextTurnPlayer(currentTurnPlayer.identity === ECoin.player1 ? ECoin.player2 : ECoin.player1);
      this.checkWinCoins(coin);
    }

    // already win, stop !
    if (this.store.winCoinPositions && this.store.winCoinPositions.length === 4) {
      return;
    }

    // if player 2 is the Computer, auto set the next coin
    if (this.store.player2.isComputer) {
      setTimeout(() => {
        const robotCoin = this.store.player2.autoSetCoin(this.store.gameStateMatrix, this.store.availablePositionSet);
        this.announceNextTurnPlayer(this.store.player1.identity);
        this.checkWinCoins(robotCoin);
        this.updateAvailablePositions();
      }, 700);
    }
  }

  /**
   * check the win positions in every step made
   * the win coins related to the latest coin just set
   * @param {Coin} coin
   */
  private checkWinCoins(coin: Coin) {
    this.store.winCoinPositions.length = 0;
    this.store.winCoinPositions.push(...GameHelper.getWinPositions(this.store.gameStateMatrix, coin));
    // console.log('winCoinPositions = ', this.store.winCoinPositions);
    if (this.store.winCoinPositions && this.store.winCoinPositions.length === 4) {
      this.playerWinSource.next(coin.state);
      coin.isOfPlayer1() ? this.store.player1.setWin() : this.store.player2.setWin();
    }
  }
  private updateAvailablePositions() {
    // calculate the available position of coin for the next turn
    // step 1: retrieve all coins dropped
    const dropCoins: Coin[] = [];
    this.store.gameStateMatrix.forEach(row => dropCoins.push(...row.filter(theCoin => !theCoin.isUnset())));

    // step 2: get available positions of all dropped coins
    dropCoins.forEach(dropCoin => {
      const pos = GameHelper.getAvailablePositionOfCoin(dropCoin);
      if (pos) {
        this.store.availablePositionSet.add(pos);
      }
    });

    // step 3: get all possible positions (overlapped) occupied coins
    dropCoins.forEach(dropCoin => {
      if (this.store.availablePositionSet.has(dropCoin.position)) {
        this.store.availablePositionSet.delete(dropCoin.position);
      }
    });
    // console.log(Array.from(this.store.availablePositionSet).toString());
  }

  // switch playing mode, to play with Human or a Computer
  switchPlayer() {
    this.store.player2 = this.store.player2.isComputer ? new Player(ECoin.player2) : new PlayerRobot();
    this.resetGameState();
  }

}
