import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class ScrollableDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const props = this.props;
    console.log(this.props);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    const radios = [];
    for (let i = 0; i < 30; i++) {
      radios.push(
        <RadioButton
          key={i}
          value={`value${i + 1}`}
          label={`Option ${i + 1}`}
          style={styles.radioButton}
        />
      );
    }

    return (
      <div>
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {radios}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}