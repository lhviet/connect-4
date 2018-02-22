import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../models/coin';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  @Input() gameMatrix: Coin[][];
  @Input() availablePositionSet: Set<string>;
  @Input() winCoinPositions: string[];
  @Output() coinClicked = new EventEmitter<Coin>();

  hoveringCol: number;

  isPresentationMode = true;

  onCoinClicked(coin: Coin) {
    this.coinClicked.emit(coin);
  }

  onMouseEnter = (colIndex: number) => this.hoveringCol = colIndex;

  onMouseLeave = () => this.hoveringCol = -1;

  onClickPresentMode = () => this.isPresentationMode = !this.isPresentationMode;
}
