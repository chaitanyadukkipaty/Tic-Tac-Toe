function socket({
  io,
  addPlayerToRoom,
  findPlayersInRoom,
  findIfPlayerInRoom,
  getGameRecords,
  getGameState,
}) {
  io.on("connection", (socket) => {
    console.log("Request to join chatroom");
    console.log(socket.id);
    socket.on("sendMsg", async ({ playerId ,Msg, roomId }) => {
      console.log(playerId ,Msg, roomId)
      const players = await findPlayersInRoom({ roomId: roomId });
      for (let play of players)
        io.in(play.playerId).emit("recieveMsg", { senderId: playerId, system: false, Msg });
    });
    socket.on("disconnect", function () {
      socket.emit("disconnected");
  });
  socket.on("error", function(){
    socket.emit("disconnected")
  })
    socket.on("joinRoom", async ({ roomId, playerId }) => {
      if (roomId != null) {
        const players = await findPlayersInRoom({ roomId: roomId });
        const player = await findIfPlayerInRoom({
          roomId: roomId,
          playerId: playerId,
        });
        if (player.length === 1) {
          socket.join(playerId, function () {
            console.log(socket.id + " has subscribed");
            console.log("Socket now in rooms", io.sockets.adapter.rooms);
          });
          socket.emit("Char", player[0].Character);
          if (players.length === 2) {
            const source = await getGameRecords({ roomId: roomId });
            const result = await getGameState({ players, roomId, source });
            socket.emit("Reload", result);
          }
          io.in(player[0].playerId).emit("joined", players);
        }
        if (players.length < 2) {
          if (player.length === 0) {
            const payload = await addPlayerToRoom({
              playerId,
              roomId,
              players,
            });
            players.push(payload);
          }
          socket.join(playerId, function () {
            console.log(socket.id + " has subscribed");
            console.log("Socket now in rooms", io.sockets.adapter.rooms);
          }); 
          socket.emit("Char", players.length === 0 ? "X" : "O");
          for (let play of players)
            io.in(play.playerId).emit("joined", players);
        }
      }
    });
  });
}

module.exports = { socket };
