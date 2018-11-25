/* global server, window, React, ReactDOM */

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      email: null,
      country: null,
      idVerified: null,
      nameVerified: null,
      emailVerified: null,
      isSubmitDisabled: true,
      options: []
    };
  }
  
  componentDidMount() {
    this.getData();
  }
  
  getData() {
    server.loadCountries((result) => {
      this.setState({options: result});
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
          this.setState({id: value}, () => {
            this.setState({idVerified: "success"}, () => this.allowDisableSubmitBtn());
          });
        } else {
          this.setState({idVerified: "error"}, () => this.allowDisableSubmitBtn());
        }
      });
    } else if (type === "name") {
      this.verify(value, "name", (verified) => {
        if(verified) {
          this.setState({name: value}, () => {
            this.setState({nameVerified: "success"}, () => this.allowDisableSubmitBtn());
          });
        } else {
          this.setState({nameVerified: "error"}, () => this.allowDisableSubmitBtn());
        }
      });
      this.setState({name: value});
    } else if (type === "email") {
      this.verify(value, "email", (verified) => {
        if(verified) {
          this.setState({email: value}, () => {
            this.setState({emailVerified: "success"}, () => this.allowDisableSubmitBtn());
          });
        } else {
          this.setState({emailVerified: "error"}, () => this.allowDisableSubmitBtn());
        }
      });
    } else if (type === "country") {
      this.setState({country: value});
    }
  }
  
  allowDisableSubmitBtn() {
    if (this.state.idVerified === "success" && this.state.nameVerified  === "success" && this.state.emailVerified === "success" ) {
      this.setState({isSubmitDisabled: false});
    } else {
      this.setState({isSubmitDisabled: true});
    }
  }
  
  handleSubmit() {
    const user = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      country: this.state.country
    };
    server.register(user, (result, error) => {
      if (error) {
      } else {
        alert("Thank you for registering!");
      }
    });
  }
  
  render() {
    return (
      <div>
        <form className="form" data-toggle="validator" role="form">
          <FormGroup controlId="id" validationState={this.state.idVerified}>
            <ControlLabel>User Id</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "id")} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={this.state.nameVerified}>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "name")} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="email" validationState={this.state.emailVerified}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="text" onChange={(e)=>this.handleInput(e, "email")} />
            <FormControl.Feedback />
          </FormGroup>
          <div className="form-group has-feedback" >
            <ControlLabel>Country</ControlLabel>
            <Dropdown name="countries" options={this.state.options} country={this.state.country} handleInput={this.handleInput.bind(this)}/>
          </div>
          <div className="form-group has-feedback" >
            <Button disabled={this.state.isSubmitDisabled ? true : false} name="Submit" handleSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </form>
      </div>
    );
  }
}