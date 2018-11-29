/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form PropTypes */

class Label extends React.Component {
  render() {
    return(
      <ControlLabel>{this.props.name}</ControlLabel>
    );
  }
}

Label.propTypes = {
  name: PropTypes.string.isRequired
};