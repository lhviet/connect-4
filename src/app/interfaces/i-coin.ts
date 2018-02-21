import {ECoin} from '../enums/e-coin.enum';

export interface ICoin {
  state: ECoin;

  isUnset(): boolean;
  isOfPlayer1(): boolean;
  isOfPlayer2(): boolean;
}
