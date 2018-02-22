import {ECoin} from '../enums/e-coin.enum';
import {Player} from './player';
import {Coin} from './coin';

export class PlayerRobot extends Player {

  avatar = 'https://www.formassembly.com/images/illustrations/avatar-robot.png';

  isComputer = true;
  // smart level of the robot, for future implementation
  smartLevel = 1;

  constructor() {
    super(ECoin.player2);
  }

  /**
   * @param {Coin[][]} gameStateMatrix
   * @param {Set<string>} availablePositionSet
   */
  autoSetCoin(gameStateMatrix: Coin[][], availablePositionSet: Set<string>): Coin {
    let coinWillBeSet: Coin;
    try {
      if (this.smartLevel === 1) {  // a dumb step from the robot
        const posArr = Array.from(availablePositionSet);
        const randomPosIndex = Math.floor(Math.random() * posArr.length);
        const row = parseInt(posArr[randomPosIndex][0], 10);
        const col = parseInt(posArr[randomPosIndex][1], 10);
        coinWillBeSet = gameStateMatrix[row][col];

        super.setCoin(coinWillBeSet);

      } else {
        // does other smarter step
      }
    } catch (err) {
      console.error('autoSetCoin ERROR = ', err.message);
    }
    return coinWillBeSet;
  }

}
