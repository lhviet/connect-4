import {Component, Input} from '@angular/core';
import {Coin} from '../../models/coin';

@Component({
  selector: 'app-game-coin',
  templateUrl: './game-coin.component.html',
  styleUrls: ['./game-coin.component.scss']
})
export class GameCoinComponent {

  @Input() coin: Coin;
  @Input() isAvailable: boolean;

  getFillColor(): string {
    if (!this.coin || this.coin.isUnset()) {
      return;
    }
    if (this.coin.isOfPlayer1()) {
      return '#ff7864';
    }
    if (this.coin.isOfPlayer2()) {
      return '#fbee5a';
    }
  }

  getBorderColor(): string {
    if (this.coin.isUnset() && this.isAvailable) {
      return 'rgba(52, 141, 222, 0.9)';
    }
  }
}
