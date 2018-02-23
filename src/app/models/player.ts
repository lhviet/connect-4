import {ECoin} from '../enums/e-coin.enum';
import {IPlayer} from '../interfaces/i-player';
import {Coin} from './coin';

export class Player implements IPlayer {

  count = 0;

  // protected & private help to encapsulate the object
  // however, it cannot reflect the interface implemented
  // so far, the consistency sometimes is not good
  protected _win = 0; // number of win of this player
  get win(): number {
    return this._win;
  }

  identity: ECoin.player1 | ECoin.player2;
  avatar = 'https://www.glamcorner.com.au/media/favicon/default/favicon_revised.png';

  isComputer = false;

  constructor(identity: ECoin.player1 | ECoin.player2) {
    this.identity = identity;
  }

  reset() {
    this.count = 0;
  }

  setWin() {
    this._win++;
  }

  setCoin(coin: Coin) {

    coin.setState(this.identity);

    // increase the step this user made
    this.count++;
  }

  autoSetCoin(gameStateMatrix: Coin[][], availablePositionSet: Set<string>) {
    console.log('Sorry, I cannot auto set coins for you :-(');
    return null;
  }
}
