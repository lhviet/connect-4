import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Player} from '../../models/player';
import {ECoin} from '../../enums/e-coin.enum';
import CPlayer from '../../constant/c-player';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss']
})
export class GamePlayerComponent implements OnChanges {
  @Input() player: Player;

  playerName: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.playerName = this.player && this.player.identity === ECoin.player1 ? CPlayer.PLAYER_1 : CPlayer.PLAYER_2;
  }


}
