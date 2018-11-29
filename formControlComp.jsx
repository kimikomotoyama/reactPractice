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
          ...this.state.userInputs
        };
        userInput[type] = value;
          
        this.setState({userInputs: userInput}, () => {
          console.log(this.state.userInputs);
          verifyObj[verifyKey] = verified ? "success": "error";
          console.log(verifyObj + ": " + verifyObj[verifyKey]);
          this.setState(verifyObj, () => this.allowDisableSubmitBtn());
        });
      });
  }
  
  render() {
    return (
      <FormControl type={this.props.type} onChange={this.props.onChange}/>
    );
  }
}

FormControlComp.propTypes = {
  type: PropTypes.string.isRequired
};