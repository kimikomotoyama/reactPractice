/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form */

class FormControlComp extends React.Component {
  render() {
    return (
      <FormControl type={this.props.type} onChange={this.props.onChange} />, {Feedback: ""}
    );
  }
}