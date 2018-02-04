import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import RootNavigation from './RootNavigation';

class RootNavigationState extends Component {
  render() {
    return (
      <RootNavigation
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(RootNavigationState);