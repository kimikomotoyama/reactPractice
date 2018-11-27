/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form */

class Label extends React.Component {
  render() {
    return(
      <ControlLabel>{this.props.name}</ControlLabel>
    );
  }
}