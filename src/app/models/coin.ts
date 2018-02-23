import {ICoin} from '../interfaces/i-coin';
import {ECoin} from '../enums/e-coin.enum';

export class Coin implements ICoin {

  state;  // to determine the coin is unset, or set-by-whom

  // encode position as a string to simplify the comparison & filter, instead of using an object like {row: number, col: number}
  // i.e., "43" means row=4, col=3
  private _position: string;
  private _row: number;
  private _col: number;

  constructor(row: number, col: number) {
    this.state = ECoin.unset;
    this._row = row;
    this._col = col;
    this._position = row.toString() + col.toString();
  }

  isUnset = (): boolean => this.state === ECoin.unset;
  isOfPlayer1 = (): boolean => this.state === ECoin.player1;
  isOfPlayer2 = (): boolean => this.state === ECoin.player2;

  setState(state: ECoin) {
    if (this.isUnset()) {
      this.state = state;
    }
  }

  get position() {
    return this._position;
  }
  get row(): number { return this._row; }
  get col(): number { return this._col; }
}
