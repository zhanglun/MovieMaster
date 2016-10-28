import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { searchMovieInDoubanAsync } from '../actions';

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
  table: {
    padding: 0,
  },
  tr: {
    height: '30px',
  },
  td: {
    height: 'initial',
    padding: '10px',
  }
};

/**
 * Dialog content can be scrollable.
 */
class ScrollableDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: props.open,
      selectedRows: [],
    };
  }

  handleClose () {
    this.setState({ open: false });
    // TODO: 更新数据库
    ipcRenderer.send('update_movie_data', {
      _id: this.props.movieid,
      detail: this.state.selectDetail
    });
  }

  handleCancel () {
    this.setState({ open: false });
  }

  selectData (selects) {
    let detail = this.props.data.subjects[selects[0]];
    this.setState({ selectDetail: detail });
    this.setState({ selectedRows: selects });
  }

  createTable (subjects) {
    let rows = [];
    if (subjects) {
      rows = subjects.map((movie, i) => {
        return (
          <TableRow
            key={movie.id}
            style={styles.tr}
            selected={this.state.selectedRows.indexOf(i) !== -1}
          >
            <TableRowColumn style={styles.td}>{movie.id}</TableRowColumn>
            <TableRowColumn style={styles.td}>{movie.title}({movie.original_title})</TableRowColumn>
            <TableRowColumn style={styles.td}>{movie.year}</TableRowColumn>
          </TableRow>
        )
      });
    }
    return (
      <Table
        onRowSelection={this.selectData.bind(this)}
        wrapperStyle={styles.table}
        style={styles.table}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>豆瓣ID</TableHeaderColumn>
            <TableHeaderColumn>名称</TableHeaderColumn>
            <TableHeaderColumn>年份</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true}>
          {rows}
        </TableBody>
      </Table>
    )
  }

  componentWillMount () {
    const { dispatch, keywords } = this.props;
    dispatch(searchMovieInDoubanAsync(keywords, () => {
      this.setState({ isLoading: false });
    }));
  }

  render () {
    const props = this.props;
    const resData = props.searchResult;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    const dialogTitle = [
      <div style={styles.processBar}>
        <LinearProgress mode="indeterminate" color=""/>
        <div>{resData.title}</div>
      </div>
    ];

    return (
      <Dialog
        title={dialogTitle}
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

function mapStateToProps (state) {
  return {
    searchResult: state.movies.searchResult
  }
}

export default connect(mapStateToProps)(ScrollableDialog);