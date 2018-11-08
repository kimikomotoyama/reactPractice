const server = new Server();

server.register(null, (something) => {
  console.log("Response: ", something);
});
