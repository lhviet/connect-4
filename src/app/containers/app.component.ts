import {Component} from '@angular/core';
import {GameService} from '../services/game/game.service';
import {Coin} from '../models/coin';
import {ECoin} from '../enums/e-coin.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gameMatrix = this.gameService.gameStateMatrix;

  constructor(private gameService: GameService) {
  }

  onCoinClicked = (coin: Coin) => this.gameService.setCoin(coin);

}
