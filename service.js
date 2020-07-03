function getGameState({ players, source }) {
  const defaultResult = {};
  defaultResult[players[0].playerId] = 100;
  defaultResult["game"] = null;
  defaultResult["board"] = Array(9).fill(null);
  defaultResult["bid"] = {};
  defaultResult["bid"]["status"] = "DONE";
  defaultResult["bid"][players[0].playerId] = 0;
  defaultResult[players[1].playerId] = 100;
  defaultResult["bid"][players[1].playerId] = 0;
  defaultResult["bidWinner"] = null;
  defaultResult["move"] = null;
  const result = source.reduce((res, tx, i) => {
    if (i == 0) {
      res = defaultResult;
    }
    if (tx.event === "bidPlaced") {
      if (res.bid.status === "DONE") {
        res.bid.status = "PROGRESS";
        res.bid[tx.playerId] = tx.value;
        res.board = tx.board;
        return res;
      }
      res.bid[tx.playerId] = tx.value;
      res.bid.status = "DONE";
      res.board = tx.board;
      if (res[players[0].playerId] === 0 && res[players[1].playerId] === 0) {
        res.bidWinner = null;
        res.bid.status = "DRAW";
        res["bid"][players[0].playerId] = 0;
        res["bid"][players[1].playerId] = 0;
        res.move = res.bidWinner;
        return res;
      }
      if (res["bid"][players[0].playerId] === res["bid"][players[1].playerId]) {
        res.bidWinner = null;
        res["bid"][players[0].playerId] = 0;
        res["bid"][players[1].playerId] = 0;
        res.move = res.bidWinner;
        return res;
      }
      res.bidWinner =
        res["bid"][players[0].playerId] > res["bid"][players[1].playerId]
          ? players[0].playerId
          : players[1].playerId;
      res[res.bidWinner] -= res["bid"][res.bidWinner];
      res.move = res.bidWinner;
      res["bid"][players[0].playerId] = 0;
      res["bid"][players[1].playerId] = 0;
      return res;
    }
    if (tx.event === "symbolPlaced") {
      res.game = tx.value;
      res.move = null;
      res.board = tx.board;
    }
    return res;
  }, defaultResult);
  return result;
}

module.exports = {
  getGameState,
};
