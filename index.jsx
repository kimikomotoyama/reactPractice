/* global server, window, React, ReactDOM */

// TODO : implement components, validation, etc

const badUser = {};
server.register(badUser, (result, error) => {
  if (error) {
    console.error("Registration failed:", error);
  } else {
    console.log(result.message);
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
  componentDidUpdate() {
    console.log("componentDidUpdate in Dropdown");
    console.log(this.props.options)
  }
  
  render() {
    return (
      <div>
        <select name={this.props.name}>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="USA">USA</option>
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
        <input onChange={this.props.verifyInput}></input>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.options;
    this.state = {
      
    };
  }
  
  getData() {
    console.log("getData");
    server.loadCountries((result) => {
      console.log(result);
      this.options = result;
    });
  }
  
  verifyInput(e) {
    console.log(e.target.value);
  }
  
  componentWillMount() {
    console.log("componentWillMount in form");
    this.getData();
  }
  
  render() {
    return (
      <div>
        <TextField label="User Id" verifyInput={this.verifyInput}/>
        <TextField label="Name" verifyInput={this.verifyInput}/>
        <TextField label="E-mail" verifyInput={this.verifyInput}/>
        <Dropdown name="countries" options={this.options}/>
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

