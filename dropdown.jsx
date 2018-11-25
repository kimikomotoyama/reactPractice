/* global server, window, React, ReactDOM */

class Dropdown extends React.Component {
  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" placeholder="select">
          <option value={this.props.country}>select</option>
          {this.props.options && this.props.options.map((option) => {
            return (<option id={option.id} value={option.label} key={option.id}>{option.label}</option>)
          })}
        </FormControl>
      </FormGroup>
    );
  }
}