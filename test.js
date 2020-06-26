const source = [
  { event: "bidPlaced", payload: { player: "p1", value: 20 } },
  { event: "bidPlaced", payload: { player: "p2", value: 30 } },
  //   { event: "bidPlaced", payload: { player: "p1", value: 20 } },
];
const defaultResult = {
  v1: 100,
  v2: 100,
  game: {},
  bid: {
    status: "DONE",
    p1: 0,
    p2: 0,
  },
  bidWinner: null, // p1, p2
};

const result = source.reduce((res, tx, i) => {
  if (i == 0) {
    res = defaultResult;
  }

  if (tx.event == "bidPlaced") {
    if (res.bid.status == "DONE") {
      res.bid.status = "PROGRESS";
      res.bid[tx.payload.player] = tx.payload.value;
      return res;
    }
    res.bid[tx.payload.player] = tx.payload.value;
    res.bid.status = "DONE";
    res.bidWinner = res.bid.p1 > res.bid.p2 ? "p1" : "p2";
    return res;
  }
  if (tx.event == "symbolPlaced") {
  }

  return res;
}, defaultResult);
console.log(result);
