import {ECoin} from '../enums/e-coin.enum';
import {IPlayer} from '../interfaces/i-player';
import {Coin} from './coin';

export class Player implements IPlayer {

  count = 0;
  identity: ECoin.player1 | ECoin.player2;

  constructor(identity: ECoin.player1 | ECoin.player2) {
    this.identity = identity;
  }

  setCoin(coin: Coin) {

    coin.setState(this.identity);

    // increase the step this user made
    this.count++;
  }

}
