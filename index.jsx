/* global server, React, ReactDOM, Form */

// TODO : implement components, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  }
});

ReactDOM.render(
  <Form></Form>,
  document.getElementById('root')
);