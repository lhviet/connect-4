import {Coin} from '../models/coin';

module GameHelper {

  /**
   * return the available position (falling from top = above of coin) to set coin for a given coin position
   * because the coin falls down, only its above row position is available
   * @param {Coin} coin
   * @returns {string}
   */
  export function getAvailablePositionOfCoin(coin: Coin): string {
    if (coin.row === 0) {
      return;
    }
    return ((coin.row - 1).toString() + coin.col.toString());
  }

  /**
   the win of connect-4 is defined as a series of 4 in horizontal, vertical, and diagonal
   to check if someone win, the checking process start after a coin set, every step of player
   it means the win-positions should related to the latest position of coin --> Check it !
   and the owner of the latest set coin is the Winner
   Whenever detect a win series of positions, return.
   Do not check all possible Win positions to offer the best performance
   * @param {Coin[][]} gameStateMatrix
   * @param {Coin} coin
   * @returns {string[]}
   */
  export function getWinPositions(gameStateMatrix: Coin[][], coin: Coin): string[] {
    let winCoins: Coin[] = [];
    // 1. check horizontal win
    // in most of cases, looks like number of horizontal win possibility is higher than vertical
    // so far, to offer the best performance, horizontal check will perform first
    const checkRow = gameStateMatrix[coin.row];
    // check if the number of winCoins from the same Player on the row is bigger than 3
    const rowCoins = checkRow.filter(coinInRow => coinInRow.state === coin.state);
    if (rowCoins.length > 3) {
      // from left to right, looking for the winCoins in series
      winCoins = getWinCoins(rowCoins);
      if (winCoins.length === 4) {
        return winCoins.map(winCoin => winCoin.position);
      }
    }
    // 2. check vertical win
    // check vertical is the easiest part, because it is one-direction, from top to bottom
    // firstly, only check if the height of the column is enough for at least 4 coins
    if (coin.row < 3) { // index from 0 -> 5, check the coin with row index in [0, 1, 2] only
      // check the next 3 coins, from the just-dropped coin (direct from) top to bottom
      winCoins = [coin];
      for (let i = 1; i < 4; i++) {
        const nextCoin = gameStateMatrix[coin.row + i][coin.col];
        if (nextCoin.state !== coin.state) {  // checking break first to limit the rounds of loop
          break;
        }
        winCoins.push(nextCoin);
      }
      if (winCoins.length === 4) {
        return winCoins.map(winCoin => winCoin.position);
      }
    }
    // 3. check diagonal win
    // separate to two sub-checks:
    // a. the diagonal-coins from left-top to right-bottom
    // b. the diagonal-coins from left-bottom to right-top
    const diagonalLT = [];
    const diagonalLB = [];
    // a. forming the series of coins (of same player of this latest coin) from LeftTop
    let r = coin.row - 1;
    let c = coin.col - 1;
    while (r > -1 && c > -1) {  // the left side of the coin
      if (gameStateMatrix[r][c].state === coin.state) {
        diagonalLT.push(gameStateMatrix[r][c]);
      }
      r--;
      c--;
    }
    diagonalLT.push(coin);
    r = coin.row + 1;
    c = coin.col + 1;
    while (r < 6 && c < 7) {  // the right side of the coin
      if (gameStateMatrix[r][c].state === coin.state) {
        diagonalLT.push(gameStateMatrix[r][c]);
      }
      r++;
      c++;
    }
    // start checking the win coins if it has
    if (diagonalLT.length > 3) {
      winCoins = getWinCoins(diagonalLT);
      if (winCoins.length === 4) {
        return winCoins.map(winCoin => winCoin.position);
      }
    }

    // b. forming the series of coins from LeftBottom
    r = coin.row - 1;
    c = coin.col + 1;
    while (r > -1 && c < 7) {
      if (gameStateMatrix[r][c].state === coin.state) {
        diagonalLB.push(gameStateMatrix[r][c]);
      }
      r--;
      c++;
    }
    diagonalLB.push(coin);
    r = coin.row + 1;
    c = coin.col - 1;
    while (r < 6 && c > -1) {
      if (gameStateMatrix[r][c].state === coin.state) {
        diagonalLB.push(gameStateMatrix[r][c]);
      }
      r++;
      c--;
    }
    // start checking the win coins if it has
    if (diagonalLB.length > 3) {
      winCoins = getWinCoins(diagonalLB);
      if (winCoins.length === 4) {
        return winCoins.map(winCoin => winCoin.position);
      }
    }
    // no win, return an empty array
    return [];
  }

  /**
   * get series of coins based on column index (increasing from left-to-right)
   * @param {Coin[]} coins
   * @returns {Coin[]}
   */
  function getWinCoins(coins: Coin[]): Coin[] {
    let winCoins: Coin[] = [];
    // sorting column index in increasing direction, left to right
    const leftToRightCoins = Array.from(coins).sort((a, b) => a.col - b.col);
    for (const coin of leftToRightCoins) {
      if (winCoins.length === 0) {
        winCoins.push(coin);
      } else {
        const theLastCoin = winCoins[winCoins.length - 1];
        if ((theLastCoin.col + 1) === coin.col) {
          // in case the coin is in series (column index must increase sequentially)
          winCoins.push(coin);
          if (winCoins.length === 4) {
            break;
          }
        } else {
          // in case the rowCoin is not in series, reset and starting count again
          winCoins = [coin];
        }
      }
    }
    return winCoins;
  }
}
export default GameHelper;
