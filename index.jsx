/* global server, window, React, ReactDOM, FormGroup */
// TODO : implement components, validation, etc
// import 'bootstrap/dist/css/bootstrap.css';

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
      <label className="control-label" htmlFor={this.props.type}>
        {this.props.label}
      </label>
    );
  }
}

class TextField extends React.Component {
  render() {
    return (  
      <input type={this.props.inputType} className={`${this.props.verified ? 'verified' : 'unverified'} form-control`} id={this.props.type} onChange={(e)=>{this.props.handleInput(e, this.props.type)}} required />
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
      <form className="form" data-toggle="validator" role="form">
        <div>{this.state.id}</div>
        <div>{this.state.name}</div>
        <div>{this.state.email}</div>
        
        <div className="form-group has-feedback" >
          <Label label="User Id" type="id"/>
          <TextField handleInput={this.handleInput.bind(this)} inputType="text" type="id" verified={this.state.idVerified}/>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className="form-group has-feedback" >
          <Label label="Name" type="name"/>
          <TextField handleInput={this.handleInput.bind(this)} inputType="text" type="name" verified={this.state.nameVerified}/>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className="form-group has-feedback" >
          <Label label="E-mail" type="email"/>
          <TextField handleInput={this.handleInput.bind(this)} inputType="email" type="email" verified={this.state.emailVerified}/>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className="form-group has-feedback" >
          <Label label="Country" type="country"/>
          <Dropdown name="countries" options={this.options}/>
        </div>
        <div className="form-group has-feedback" >
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

