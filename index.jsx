/* global server, ReactDOM */

// TODO : implement form, validation, etc

server.register(null, (something) => {
  console.log("Response: ", something);
});

// React
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
