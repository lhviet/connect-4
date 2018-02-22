import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game/game.service';
import {Coin} from '../models/coin';
import {ECoin} from '../enums/e-coin.enum';
import CPlayer from '../constant/c-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  gameStore = this.gameService.store;

  gameHeaderTitle = `Turn of ${CPlayer.PLAYER_1}`;
  notificationMessage: string;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {

    // observe the change of player turn
    this.gameService.playerTurn$.subscribe((playerId: ECoin) => {
      // console.log('turn update = ', playerId);
      this.gameHeaderTitle = `Turn of ${playerId === ECoin.player1 ? CPlayer.PLAYER_1 : CPlayer.PLAYER_2}`;
    });

    // observe the change of player win
    this.gameService.playerWin$.subscribe((playerId: ECoin) => {
      // console.log('win update = ', playerId);
      this.gameHeaderTitle = `${playerId === ECoin.player1 ? CPlayer.PLAYER_1 : CPlayer.PLAYER_2} WIN !!!`;
    });

  }

  onCoinClicked = (coin: Coin) => {
    if (this.gameStore.winCoinPositions.length === 4) {
      return this.setErrorWin();
    }
    if (!this.gameStore.availablePositionSet.has(coin.position)) {
      return this.setErrorPosition();
    }
    this.gameService.setCoin(coin);
  }

  resetGame = () => this.gameService.resetGameState();

  switchPlayer = () => this.gameService.switchPlayer();

  setErrorPosition = () => {
    this.notificationMessage = 'The Coin must be set from bottom up';
    setTimeout(() => this.notificationMessage = '', 3000);
  }
  setErrorWin = () => {
    this.notificationMessage = 'To continue, please start a New Game';
    setTimeout(() => this.notificationMessage = '', 3000);
  }
}
