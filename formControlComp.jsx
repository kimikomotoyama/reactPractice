/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */

class FormControlComp extends React.Component {
  render() {
    return (
      <FormControl type={this.props.type} onChange={this.props.onChange}/>
    );
  }
}

class Feedback extends React.Component {
  render() {
    return (
      <FormControl.Feedback />
    );
  }
}

FormControlComp.propTypes = {
  type: PropTypes.string.isRequired
};