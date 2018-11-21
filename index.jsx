/* global server, window, React, ReactDOM */
import Home from 'window.Home';

// TODO : implement components, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  }
});

ReactDOM.render(
  <Home></Home>,
  document.getElementById('root')
);