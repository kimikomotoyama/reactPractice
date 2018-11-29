/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */
/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */

class FormGroupComp extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.controlId} validationState={this.props.validationState}>
        {this.props.children}
      </FormGroup>
    );
  }
}

FormGroupComp.propTypes = {
  controlId: PropTypes.string.isRequired,
};