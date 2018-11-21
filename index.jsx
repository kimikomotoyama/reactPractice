/* global server, window, React, ReactDOM */

// TODO : implement components, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  }
});

class Form extends React.Component {

}

class Home extends React.Component {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

ReactDOM.render(
  <Home></Home>,
  document.getElementById('root')
);

