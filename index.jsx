/* global server, window, React, ReactDOM */

// TODO : implement components, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  }
});

class Button extends React.Component {
  render() {
    return (
      <div>
        <button>{this.props.name}</button>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  render() {
    return (
      <div>
        <select name={this.props.name}>
          <option value="test">Test</option>
        </select>
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    return (
      <div>
        {this.props.label}
      </div>
    );
  }
}

class TextField extends React.Component {
  render() {
    return (
      <div>
        <Label label={this.props.label}/>
        <input></input>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <div>
        <TextField label="User Id"/>
        <TextField label="Name"/>
        <TextField label="E-mail"/>
        <Dropdown name="countries"/>
        <Button name="Submit"/>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

