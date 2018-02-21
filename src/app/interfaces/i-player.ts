import {ECoin} from '../enums/e-coin.enum';
import {Coin} from '../models/coin';

export interface IPlayer {

  count: number;    // steps made of this player

  // identity of the player
  identity: ECoin.player1 | ECoin.player2;

  setCoin(coin: Coin): void;
}
