/* global server, window, React, ReactDOM PropTypes */

class Dropdown extends React.Component {
  handleInput(e, type) { 
    let value = e.target.value;
    if (type === "country") {
      this.props.setFormState({userInputs: {...this.props.userInputs, country: value}}, () => console.log(this.props.userInputs));
    }
  }
  
  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" placeholder="select" onChange={(e) => this.handleInput(e, "country")}>
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
  options: PropTypes.string.isRequired
};