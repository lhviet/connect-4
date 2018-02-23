import {ECoin} from '../enums/e-coin.enum';

export interface ICoin {

  state: ECoin; // unset, set-by-player-1, set-by-player-2

  isUnset(): boolean;

  isOfPlayer1(): boolean;

  isOfPlayer2(): boolean;

}
