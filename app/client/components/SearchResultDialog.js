import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const styles = {
  dialog: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    padding: '16px 20px',
    marginBottom: '2px',
  },
  table: {},
  tr: {
    height: 10,
    boxSizing: 'border-box',
  },
  td: {
    height: 26,
    boxSizing: 'border-box',
  }
};

/**
 * Dialog content can be scrollable.
 */
export default class ScrollableDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  handleClose() {
    this.setState({ open: false });
    // TODO: 更新数据库
    ipcRenderer.send('update_movie_data', { _id: this.props.movieid, detail: this.state.selectDetail });
  }

  selectData(selects) {
    let detail = this.props.data.subjects[selects[0]];
    this.setState({ selectDetail: detail });
  }

  createTable(subjects) {
    let rows = [];
    if (subjects) {
      rows = subjects.map((movie) => {
        return (
          <TableRow key={movie.id} style={styles.tr}>
            <TableRowColumn style={styles.td}>{movie.id}</TableRowColumn>
            <TableRowColumn style={styles.td}>{movie.title}({movie.original_title})</TableRowColumn>
            {/*<TableRowColumn style={styles.td}>{movie.directors[0].name}</TableRowColumn>*/}
            <TableRowColumn style={styles.td}>{movie.year}</TableRowColumn>
          </TableRow>
        )
      });
    }
    return (
      <Table onRowSelection={this.selectData.bind(this)}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>豆瓣ID</TableHeaderColumn>
            <TableHeaderColumn>名称</TableHeaderColumn>
            <TableHeaderColumn>导演</TableHeaderColumn>
            <TableHeaderColumn>年份</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    )
  }

  render() {
    const props = this.props;
    const resData = props.data;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    return (
      <Dialog
        title={resData.title}
        actions={actions}
        modal={false}
        open={this.state.open}
        titleStyle={styles.title}
        contentStyle={styles.dialog}
        onRequestClose={this.handleClose.bind(this)}
        autoScrollBodyContent={true}

      >
        {this.createTable(resData.subjects)}
      </Dialog>
    );
  }
}