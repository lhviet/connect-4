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
        coinWillBeSet = GameHelper.getRandomCoin(gameStateMatrix, availablePositionSet);
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
          const simulateCoin = GameHelper.getCoinOfPosition(gameStateMatrix, pos);
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
          coinWillBeSet = GameHelper.getRandomCoin(gameStateMatrix, availablePositionSet);
        }
        super.setCoin(coinWillBeSet);
      }
      else if (this.smartLevel === 3) {
        if (this.count === 0) {
          const arr = Array.from(availablePositionSet)
            .filter(p => (parseInt(p[0], 10) > 4 && parseInt(p[1], 10) > 0 && parseInt(p[1], 10) < 6));
          const randomPosIndex = Math.floor(Math.random() * arr.length);
          coinWillBeSet = GameHelper.getCoinOfPosition(gameStateMatrix, arr[randomPosIndex]);
        } else {
          // Robot is player 2 --> max player
          let bestMove = -Infinity;
          availablePositionSet.forEach(pos => {
            const simulateCoin = GameHelper.getCoinOfPosition(gameStateMatrix, pos);
            // the coin is from this smart Robot
            simulateCoin.state = ECoin.player2;
            const simulateAvailableSet = GameHelper.getAvailablePositions(gameStateMatrix, availablePositionSet);
            const simulateValue =
              GameHelper.abMinimax(gameStateMatrix, simulateAvailableSet, simulateCoin, true, 0, -Infinity, Infinity);
            console.log(pos + ' simulateValue = ', simulateValue);
            if (simulateValue > bestMove) {
              bestMove = simulateValue;
              coinWillBeSet = simulateCoin;
              console.log('bestMove = ', bestMove);
            }
            simulateCoin.state = ECoin.unset;
          });
        }
        if (!coinWillBeSet) {
          coinWillBeSet = GameHelper.getRandomCoin(gameStateMatrix, availablePositionSet);
          console.log('set random coin ~');
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

}
