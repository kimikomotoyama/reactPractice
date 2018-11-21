/* global server, window, React, ReactDOM, FormGroup */
// TODO : implement components, validation, etc
// import 'bootstrap/dist/css/bootstrap.css';

class Button extends React.Component {
  render() {
    return (
      <div>
        <button disabled={this.props.disabled} onClick={this.props.handleSubmit}>{this.props.name}</button>
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
        <select className="form-control" name={this.props.name}>
          <option id="JP" value="Japan">Japan</option>
          <option id="FR" value="France">France</option>
          <option id="USA" value="USA">USA</option>
        </select>
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    return (
      <div for={this.props.type} className="control-label">
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
        <input className={`${this.props.verified ? 'verified' : 'unverified'}`} onChange={(e)=>{this.props.handleInput(e, this.props.type)}}></input>
      </div>
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
      idVerified: false,
      nameVerified: false,
      emailVerified: false,
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
      if (input.length > 2) callback(true);
    } else if (type === 'email') {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) callback(true);
    }
  }
  
  handleInput(e, type) { 
    let verified;
    let value = e.target.value;
    
    if (type === "id") {
      this.verify(value, "id", (verified) => {
        if(verified) {
          this.setState({id: value});
          this.setState({idVerified: true});
        } else {
          this.setState({idVerified: false});
        }
      });
    } else if (type === "name") {
      this.verify(value, "name", (verified) => {
        if(verified) {
          this.setState({name: value});
          this.setState({nameVerified: true});
        } else {
          this.setState({nameVerified: false});
        }
      });
      this.setState({name: value});
    } else if (type === "email") {
      this.verify(value, "email", (verified) => {
        if(verified) {
          this.setState({email: value});
          this.setState({emailVerified: true});
        } else {
          this.setState({emailVerified: false});
        }
      });
    }
    if (this.state.idVerified && this.state.nameVerified && this.state.emailVerified) {
      this.setState({isSubmitDisabled: false});
    } else {
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
      <form>
        <div>{this.state.id}</div>
        <div>{this.state.name}</div>
        <div>{this.state.email}</div>
        
        <div className="form-group" >
          <TextField label="User Id" handleInput={this.handleInput.bind(this)} type="id" verified={this.state.idVerified}/>
        </div>
        <div className="form-group" >
          <TextField label="Name" handleInput={this.handleInput.bind(this)} type="name" verified={this.state.nameVerified}/>
        </div>
        <div className="form-group" >
          <TextField label="E-mail" handleInput={this.handleInput.bind(this)} type="email" verified={this.state.emailVerified}/>
        </div>
        <div className="form-group" >
          <Dropdown name="countries" options={this.options}/>
        </div>
        <div className="form-group" >
          <Button disabled={this.state.isSubmitDisabled ? true : false} name="Submit" handleSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </form>
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

