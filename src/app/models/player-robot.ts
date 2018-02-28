import {ECoin} from '../enums/e-coin.enum';
import {Player} from './player';
import {Coin} from './coin';
import GameHelper from '../helpers/game-helper';

export class PlayerRobot extends Player {

  avatar = 'https://www.formassembly.com/images/illustrations/avatar-robot.png';

  isComputer = true;
  // smart level of the robot, for future implementation
  smartLevel = 1;

  constructor(level = 1) {
    super(ECoin.player2);
    this.smartLevel = level;
  }

  setLevel(smartLevel: number) {
    this.smartLevel = smartLevel;
  }

  /**
   * @param {Coin[][]} gameStateMatrix
   * @param {Set<string>} availablePositionSet
   */
  autoSetCoin(gameStateMatrix: Coin[][], availablePositionSet: Set<string>): Coin {
    let coinWillBeSet: Coin;
    try {
      if (this.smartLevel === 1) {  // a dumb step from the robot
        coinWillBeSet = this.getRandomCoin(gameStateMatrix, availablePositionSet);
        super.setCoin(coinWillBeSet);
      }
      else if (this.smartLevel === 2) {
        // a smarter step from the robot, level 2. Strategy:
        // Simulate the possible win position of the opponent --> take the position
        // If no position, simulate the possible win position of Robot turn --> take the position
        // If no, random position
        const posArr = Array.from(availablePositionSet);
        for (let i = 0; i < posArr.length; i++) {
          const pos = posArr[i];
          const row = parseInt(pos[0], 10);
          const col = parseInt(pos[1], 10);
          const simulateCoin = gameStateMatrix[row][col];
          // suppose that this coin is from the opponent
          simulateCoin.state = ECoin.player1;
          if (GameHelper.getWinPositions(gameStateMatrix, simulateCoin).length === 4) {
            simulateCoin.state = ECoin.unset; // reset the state after found the coin
            coinWillBeSet = simulateCoin;
            break;
          }
          else {
            simulateCoin.state = ECoin.player2; // suppose that this coin will help the Robot win
            if (GameHelper.getWinPositions(gameStateMatrix, simulateCoin).length === 4) {
              simulateCoin.state = ECoin.unset; // reset the state after found the coin
              coinWillBeSet = simulateCoin;
              break;
            }
            simulateCoin.state = ECoin.unset; // reset the state if found nothing for this coin
          }
        }
        if (!coinWillBeSet) { // select coin randomly like level 1
          coinWillBeSet = this.getRandomCoin(gameStateMatrix, availablePositionSet);
        }
        super.setCoin(coinWillBeSet);
      }
      else {
        // does other smarter step
      }
    } catch (err) {
      console.error('autoSetCoin ERROR = ', err.message);
    }
    return coinWillBeSet;
  }

  /**
   * randomly select an available position of Coin
   * @param {Coin[][]} gameStateMatrix
   * @param {Set<string>} availablePositionSet
   * @returns {Coin}
   */
  private getRandomCoin(gameStateMatrix: Coin[][], availablePositionSet: Set<string>): Coin {
    const posArr = Array.from(availablePositionSet);
    const randomPosIndex = Math.floor(Math.random() * posArr.length);
    const row = parseInt(posArr[randomPosIndex][0], 10);
    const col = parseInt(posArr[randomPosIndex][1], 10);
    return gameStateMatrix[row][col];
  }

}
