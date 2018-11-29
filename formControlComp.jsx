/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */

class FormControlComp extends React.Component {
  
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
  
  verifyEachInput(type, value, verifyKey) {
    this.verify(value, type, (verified) => {
        const verifyObj = {};
        const userInput = {
          ...this.props.userInputs
        };
        userInput[type] = value;
          
        this.props.setFormState({userInputs: userInput}, () => {
          console.log(this.props.userInputs);
          verifyObj[verifyKey] = verified ? "success": "error";
          console.log(verifyObj + ": " + verifyObj[verifyKey]);
          this.props.setFormState(verifyObj, () => this.props.allowDisableSubmitBtn());
        });
      });
  }
  
  handleInput(e, type) { 
    let verified;
    let value = e.target.value;
    
    if (type === "id") {
      this.verifyEachInput(type, value, "idVerified");
    } else if (type === "name") {
      this.verifyEachInput(type, value, "nameVerified");
    } else if (type === "email") {
      this.verifyEachInput(type, value, "emailVerified");
    } 
  }
  
  render() {
    return (
      <FormControl type={this.props.type} onChange={(e) => this.handleInput(e, this.props.userInputCategory)}/>
    );
  }
}

FormControlComp.propTypes = {
  type: PropTypes.string.isRequired
};