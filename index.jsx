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
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options
    }
  }
  
  componentWillReceiveProps() {
    console.log("component will receive props in Dropdown");
    console.log(this.props.options);
    this.setState({
      options: this.props.options
    });
  }
  
  render() {
    console.log("component will render in Dropdown");
    console.log(this.props.options);
    return (
      <div>
        <select name={this.props.name}>
          
          <option value="Japan">Japan</option>
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
  constructor(props) {
    super(props);
    this.state = {
      countries: {}
    };
  }
  
  componentWillMount() {
    console.log("component will mount in form");
    server.loadCountries((result) => {
      console.log(result);
      this.setState({
        countries: result
      });
    });
  }
  
  render() {
    return (
      <div>
        <TextField label="User Id"/>
        <TextField label="Name"/>
        <TextField label="E-mail"/>
        <Dropdown name="countries" options={this.state.countries}/>
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

