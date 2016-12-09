import React from 'react';
import { connect } from 'react-redux';

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
    marginBottom: '4px',
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
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      loading: true,
      selectedRows: [],
      searchResult: {},
    };
  }

  handleConfirm() {
    let { selectDetail } = this.state;
    let { onSelectData } = this.props;
    this.setState({ loading: true });
    window.fetch('https://api.douban.com/v2/movie/subject/' + selectDetail.id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ selectDetail: data });
        this.setState({ open: false });
        this.setState({ loading: false });
        ipcRenderer.send('update_movie_data', {
          _id: this.props.movieId,
          detail: this.state.selectDetail
        });
        onSelectData(selectDetail);
      });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  selectData(selects) {
    let detail = this.state.searchResult.subjects[selects[0]];
    this.setState({ selectDetail: detail });
    this.setState({ selectedRows: selects });
  }

  createTable(subjects) {
    let rows = [];
    if (subjects) {
      rows = subjects.map((movie, i) => {
        return (
          <tr>
            key={i}
            style={styles.tr}
            selected={this.state.selectedRows.indexOf(i) !== -1}
            >
            <td style={styles.td}>{movie.id}</td>
            <td style={styles.td}>{movie.title}({movie.original_title})</td>
            <td style={styles.td}>{movie.year}</td>
          </tr>
        )
      });
    }
    return (
      <Table
        onRowSelection={this.selectData.bind(this)}
        wrapperStyle={styles.table}
        style={styles.table}
      >
        <thead>
        <tr>
          <th>豆瓣ID</th>
          <th>名称</th>
          <th>年份</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </Table>
    )
  }

  componentWillMount() {
    const { keywords } = this.props;
    window.fetch('https://api.douban.com/v2/movie/search?q=' + keywords)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ searchResult: data });
        this.setState({ loading: false });
      })
      .catch((err) => {
      })
  }

  componentWillUnmount() {
  }

  render() {
    const resData = this.state.searchResult;

    return (
      <div>
        {this.createTable(resData.subjects)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResult: state.movies.searchResult
  }
}

export default connect(mapStateToProps)(ScrollableDialog);