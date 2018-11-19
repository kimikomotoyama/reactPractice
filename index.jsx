/* global server, ReactDOM */

// TODO : implement form, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  }
});
