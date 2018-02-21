import {ICoin} from '../interfaces/i-coin';
import {ECoin} from '../enums/e-coin.enum';

export class Coin implements ICoin {

  state: ECoin;

  constructor() {
    this.state = ECoin.unset;
  }

  isUnset = (): boolean => this.state === ECoin.unset;
  isOfPlayer1 = (): boolean => this.state === ECoin.player1;
  isOfPlayer2 = (): boolean => this.state === ECoin.player2;

  setState(state: ECoin) {
    if (this.isUnset()) {
      this.state = state;
    }
  }
}
