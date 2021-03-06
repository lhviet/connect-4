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
  availablePositionSet: Set<string>;  // using set of string to reserve the unique character
}

const DEFAULT_ROBOT_LEVEL = 2;

@Injectable()
export class GameService {

  store: IStore  = {
    gameStateMatrix: [],
    player1: new Player(ECoin.player1),
    player2: new PlayerRobot(DEFAULT_ROBOT_LEVEL),
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

    // reset available positions to the (preset) bottom row
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

  // announce the turn of Player is updated
  announceNextTurnPlayer = (player: ECoin.player1 | ECoin.player2) => this.playerTurnSource.next(player);

  /**
   * set coin for current Player
   * the logic of setting coin in function setCoin in this service
   * @param {Coin} coin
   */
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
      // announce the win player identity
      this.playerWinSource.next(coin.state);
      // increase the winner win's number
      coin.isOfPlayer1() ? this.store.player1.setWin() : this.store.player2.setWin();
    }
  }

  // calculate the available positions of coin for the next turn
  private updateAvailablePositions() {
    this.store.availablePositionSet = GameHelper.getAvailablePositions(this.store.gameStateMatrix, this.store.availablePositionSet);
  }

  // switch playing mode, to play with Human or a Computer
  switchPlayer() {
    this.store.player2 = this.store.player2.isComputer ? new Player(ECoin.player2) : new PlayerRobot(DEFAULT_ROBOT_LEVEL);
    this.resetGameState();
  }

}
