/* global server, window, React, ReactDOM PropTypes */

class Dropdown extends React.Component {
  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" placeholder="select" onChange={(e) => this.props.handleInput(e, "country")}>
          <option value={this.props.country}>select</option>
          {this.props.options && this.props.options.map((option) => {
            return (<option id={option.id} value={option.label} key={option.id}>{option.label}</option>)
          })}
        </FormControl>
      </FormGroup>
    );
  }
}

Dropdown.propTypes = {
  handleInput: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired
};