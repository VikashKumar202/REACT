import React, { Component } from 'react';
import { UIView } from '@uirouter/react';
import Loader from 'react-loading-overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { connect } from 'react-redux';

library.add(faEdit, faBell);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isLoading !== prevState.isLoading) {
      return { isLoading: nextProps.isLoading };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  render() {
    return (
      <Loader active={this.state.isLoading} className="loader-overlay-position" spinner>
        <div>
          <UIView/>
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps, null)(App);
