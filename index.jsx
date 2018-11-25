/* global server, window, React, ReactDOM, ReactBootstrap Button Dropdown Form */
// TODO : implement components, validation, etc

const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const FormControl = ReactBootstrap.FormControl;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

