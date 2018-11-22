/* global server, window, React, ReactDOM, ReactBootstrap */
// TODO : implement components, validation, etc
const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const FormControl = ReactBootstrap.FormControl;

class Button extends React.Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" disabled={this.props.disabled} onClick={this.props.handleSubmit}>{this.props.name}</button>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  componentDidMount() {
    console.log("componentDidMount in Dropdown");
    console.log(this.props.options)
  }
  
  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" placeholder="select">
          <option value="">select</option>
          {this.props.options && this.props.options.map((option) => {
            <option id={option.id} value={option.label}></option>  
          })}
        </FormControl>
      </FormGroup>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.options;
    this.state = {
      id: null,
      name: null,
      email: null,
      idVerified: null,
      nameVerified: null,
      emailVerified: null,
      isSubmitDisabled: true
    };
  }
  
  getData() {
    console.log("getData");
    server.loadCountries((result) => {
      console.log(result);
      this.options = result;
    });
  }
  
  verify(input, type, callback) {
    if (type === 'id') {
      server.isIdValid(input, (response) => {
        callback(response);
      });
    } else if (type === 'name') {
      if (input.length > 2) {
        callback(true);
      } else {
        callback(false);
      }
    } else if (type === 'email') {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        callback(true);
      } else {
        callback(false);
      }
    }
  }
  
  handleInput(e, type) { 
    let verified;
    let value = e.target.value;
    
    if (type === "id") {
      this.verify(value, "id", (verified) => {
        if(verified) {
          this.setState({id: value});
          this.setState({idVerified: "success"});
        } else {
          this.setState({idVerified: "error"});
        }
      });
    } else if (type === "name") {
      this.verify(value, "name", (verified) => {
        if(verified) {
          this.setState({name: value});
          this.setState({nameVerified: "success"});
        } else {
          this.setState({nameVerified: "error"});
        }
      });
      this.setState({name: value});
    } else if (type === "email") {
      this.verify(value, "email", (verified) => {
        if(verified) {
          this.setState({email: value});
          this.setState({emailVerified: "success"});
        } else {
          this.setState({emailVerified: "error"});
        }
      });
    }
    if (this.state.idVerified === "success" && this.state.nameVerified  === "success" && this.state.emailVerified === "success" ) {
      console.log("success everything");
      this.setState({isSubmitDisabled: false});
    } else {
      console.log("not verified all yet");
      this.setState({isSubmitDisabled: true});
    }
  }
  
  handleSubmit() {
    console.log("handleSubmit");
    const user = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    };
    server.register(user, (result, error) => {
      if (error) {
        console.error("Registration failed:", error);
      } else {
        console.log(user);
        console.log(result.message);
        alert("Thank you for registering!");
      }
    });
  }
  
  componentWillMount() {
    console.log("componentWillMount in form");
    this.getData();
  }
  
  render() {
    return (
      <div>
        <div>{this.state.idVerified}</div>
        <form className="form" data-toggle="validator" role="form">
          <FormGroup controlId="id" validationState={`${this.state.idVerified}`}>
            <ControlLabel>User Id</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "id")} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={`${this.state.nameVerified}`}>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "name")} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="email" validationState={`${this.state.emailVerified}`}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "email")} />
            <FormControl.Feedback />
          </FormGroup>
          <div className="form-group has-feedback" >
            <ControlLabel>Country</ControlLabel>
            <Dropdown name="countries" options={this.options}/>
          </div>
          <div className="form-group has-feedback" >
            <Button disabled={this.state.isSubmitDisabled ? true : false} name="Submit" handleSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </form>
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

