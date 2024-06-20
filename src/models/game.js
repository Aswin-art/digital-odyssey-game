export class Game {
  constructor(k) {
    this.k = k;
    this.gameCode = "";
    this.playerName = "";
    this.playerNPM = "";
    this.coin = playerState.getCoin();
    this.point = playerState.getPoint();
  }

  getPoint() {
    return this.point;
  }

  setPoint(value) {
    return playerState.addPoint(value);
  }

  getCoin() {
    return this.coin;
  }

  setCoin(value) {
    return playerState.addCoin(value);
  }

  getPlayerInformation() {}

  saveState() {}
}
