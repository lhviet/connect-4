import {ECoin} from '../enums/e-coin.enum';
import {Coin} from '../models/coin';

export interface IPlayer {

  count: number;    // steps made of this player
  win: number;      // number of win of this player

  // identity of the player
  identity: ECoin.player1 | ECoin.player2;

  avatar: string;

  isComputer: boolean;

  reset(): void;

  setWin(): void;  // increase win number

  setCoin(coin: Coin): void;

  autoSetCoin?(gameStateMatrix: Coin[][], availablePositionSet: Set<string>): Coin;
}
