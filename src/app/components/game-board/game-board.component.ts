import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../models/coin';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  @Input() gameMatrix: Coin[][];
  @Output() coinClicked = new EventEmitter<Coin>();

  onCoinClicked(coin: Coin) {
    this.coinClicked.emit(coin);
  }

}
