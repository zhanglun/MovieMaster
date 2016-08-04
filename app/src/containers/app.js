import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FileExplorer from '../components/fileExplorer';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Movie</h1>
        <FileExplorer />
      </div>
    );
  }
}
