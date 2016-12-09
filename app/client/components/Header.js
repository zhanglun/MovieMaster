import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

class MainTop extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openLeftDrawer: false,
      value: 3,
    };
  }

  toggleLeftDrawer () {
    this.setState({ openLeftDrawer: !this.state.openLeftDrawer });
  }

  handleClose () {
    this.setState({ openLeftDrawer: false });
  }

  render () {
    return (
        // <div className="main-topbar">
        //   <div className="appbar">
        //     <div className="appbar-drawerbtn">
        //     </div>
        //     <div className="search-box">
        //       <input type="text" className="search-box__input" placeholder="Search"/>
        //     </div>
        //   </div>
        //   <div className="action-bar">
        //     <div className="action-bar__item">
        //       <span className="action-bar__link">Genres
        //         {/*<span className='material-icons'>expand_more</span>*/}
        //       </span>
        //     </div>
        //     <div className="action-bar__spacer"></div>
        //     <div className="action-bar__item">
        //       <Link className="action-bar__link" activeClassName="action-bar__link--active"
        //             to={'/'}>Home</Link>
        //     </div>
        //     <div className="action-bar__item">
        //       <Link className="action-bar__link">Recent</Link>
        //     </div>
        //   </div>
        // </div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                  <li className="divider"></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default MainTop;