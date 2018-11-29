/* global server, window, React, ReactDOM */

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputs: {
        id: null,
        name: null,
        email: null,
        country: null,
      },
      userInputVerifications: {
        idVerified: null,
        nameVerified: null,
        emailVerified: null,
      },
      isSubmitDisabled: true,
      options: []
    };
  }
  
  componentDidMount() {
    this.getData();
  }
  
  getData() {
    server.loadCountries((result) => {
      this.setState({options: result || []});
    });
  }
  
  setFormState(stateObj, callback) {
    this.setState(stateObj, callback);
  }
  
  handleInput(e, type) { 
    // let verified;
    let value = e.target.value;
    if (type === "country") {
      this.setState({userInputs: {...this.state.userInputs, country: value}});
    }
    
    // if (type === "id") {
    //   this.verifyEachInput(type, value, "idVerified");
    // } else if (type === "name") {
    //   this.verifyEachInput(type, value, "nameVerified");
    // } else if (type === "email") {
    //   this.verifyEachInput(type, value, "emailVerified");
    // } else if (type === "country") {
    //   this.setState({userInputs: {...this.state.userInputs, country: value}});
    // }
  }
  
  allowDisableSubmitBtn() {
    const verified = this.state.idVerified === "success" && this.state.nameVerified  === "success" && this.state.emailVerified === "success";
    this.setState({isSubmitDisabled: verified ? false : true});
  }
  
  handleSubmit() {
    const user = {
      id: this.state.userInputs.id,
      name: this.state.userInputs.name,
      email: this.state.userInputs.email,
      country: this.state.userInputs.country
    };
    server.register(user, (result, error) => {
      if (error) {
        alert("your submission failed to register");
      } else {
        alert("Thank you for registering!");
      }
    });
  }
  
  render() {
    return (
      <div>
        <form className="form" data-toggle="validator" role="form">
          <FormGroupComp controlId="id" validationState={this.state.idVerified}>
            <Label name="User Id" />
            <FormControlComp type="text" userInputCategory="id" userInputs={this.state.userInputs} allowDisableSubmitBtn={this.allowDisableSubmitBtn.bind(this)} setFormState={this.setFormState.bind(this)}/>
            <FormControl.Feedback />
          </FormGroupComp>
          <FormGroupComp controlId="name" validationState={this.state.nameVerified}>
            <Label name="Name" />
            <FormControlComp type="text" userInputCategory="name" userInputs={this.state.userInputs} allowDisableSubmitBtn={this.allowDisableSubmitBtn.bind(this)} setFormState={this.setFormState.bind(this)} />
            <FormControl.Feedback />
          </FormGroupComp>
          <FormGroupComp controlId="email" validationState={this.state.emailVerified}>
            <Label name="E-mail" />
            <FormControlComp type="text" userInputCategory="email" userInputs={this.state.userInputs} allowDisableSubmitBtn={this.allowDisableSubmitBtn.bind(this)} setFormState={this.setFormState.bind(this)} />
            <FormControl.Feedback />
          </FormGroupComp>
          <div className="form-group has-feedback" >
            <Label name="Country" />
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