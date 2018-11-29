/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */

class FormControlComp extends React.Component {
  render() {
    return (
      <FormControl type={this.props.type} onChange={this.props.onChange}/>
    );
  }
}

FormControlComp.propTypes = {
  type: PropTypes.string.isRequired
};