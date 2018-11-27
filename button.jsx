/* global server, window, React, ReactDOM PropTypes */

class Button extends React.Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" disabled={this.props.disabled} onClick={this.props.handleSubmit}>{this.props.name}</button>
      </div>
    );
  }
}

Button.propTypes = {
  handleSubmit: PropTypes.element.isRequired,
  name: PropTypes.element.isRequired
};