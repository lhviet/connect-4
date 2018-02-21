import {Component, Input} from '@angular/core';
import {Coin} from '../../models/coin';

@Component({
  selector: 'app-game-coin',
  templateUrl: './game-coin.component.html',
  styleUrls: ['./game-coin.component.scss']
})
export class GameCoinComponent {

  @Input() coin: Coin;

  getFillColor(): string {
    if (!this.coin || this.coin.isUnset()) {
      return;
    }
    if (this.coin.isOfPlayer1()) {
      return 'red';
    }
    if (this.coin.isOfPlayer2()) {
      return 'yellow';
    }
  }
}
